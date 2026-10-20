Add-Type -AssemblyName System.Web

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       Spirifly - Extractor Oficial de Deseos             " -ForegroundColor Yellow
Write-Host "       100% Seguro, Local, Directo y Oficial              " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$reg = $args[0]
$apiHost = "public-operation-hk4e-sg.hoyoverse.com"
$isCN = ($reg -eq "china")
if ($isCN) {
    Write-Host "Usando ubicacion de cache para China..." -ForegroundColor Yellow
    $apiHost = "public-operation-hk4e.mihoyo.com"
}

# -------------------------------------------------------------------------
# 1. DETECCIÓN DEL DIRECTORIO DEL JUEGO
# -------------------------------------------------------------------------
$gamedir = $null

# Intento A: Proceso activo si el juego está abierto
$proc = Get-Process GenshinImpact, YuanShen -ErrorAction SilentlyContinue | Where-Object { $_.Path } | Select-Object -First 1
if ($proc -and $proc.Path) {
    $procDir = Split-Path -Path $proc.Path -Parent
    $candidate = Join-Path $procDir ($proc.ProcessName + "_Data")
    if (Test-Path -LiteralPath $candidate) {
        $gamedir = $candidate
        if ($proc.ProcessName -eq "YuanShen") { $isCN = $true; $apiHost = "public-operation-hk4e.mihoyo.com" }
        Write-Host "[+] Juego detectado en ejecucion: $($proc.ProcessName)" -ForegroundColor Green
    }
}

# Intento B: Registro en output_log.txt
if (-not $gamedir) {
    $logLocations = @(
        "$env:USERPROFILE\AppData\LocalLow\miHoYo\Genshin Impact\output_log.txt",
        "$env:USERPROFILE\AppData\LocalLow\miHoYo\$([char]0x539f)$([char]0x795e)\output_log.txt"
    )

    foreach ($loc in $logLocations) {
        $path = [System.Environment]::ExpandEnvironmentVariables($loc)
        if (Test-Path -LiteralPath $path) {
            try {
                $stream = [System.IO.File]::Open($path, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
                $reader = New-Object System.IO.StreamReader($stream)
                $pattern = [regex]'(?:.:[/\\][^"\r\n]+(?:GenshinImpact_Data|YuanShen_Data))'
                while (-not $reader.EndOfStream) {
                    $line = $reader.ReadLine()
                    $match = $pattern.Match($line)
                    if ($match.Success) {
                        $candidate = $match.Value.Replace('/', '\')
                        if (Test-Path -LiteralPath $candidate) {
                            $gamedir = $candidate
                            if ($candidate -match 'YuanShen_Data') { $isCN = $true; $apiHost = "public-operation-hk4e.mihoyo.com" }
                            break
                        }
                    }
                }
                $reader.Close()
                $stream.Close()
            } catch {}
            if ($gamedir) { break }
        }
    }
}

if (-not $gamedir) {
    Write-Host "`n[ERROR] No se pudo encontrar el directorio del juego en los registros." -ForegroundColor Red
    Write-Host "Por favor realiza estos sencillos pasos:" -ForegroundColor Yellow
    Write-Host " 1. Abre Genshin Impact." -ForegroundColor White
    Write-Host " 2. Abre el menu de Deseos (F3) y haz clic en 'Historial'." -ForegroundColor White
    Write-Host " 3. Vuelve a ejecutar este comando.`n" -ForegroundColor White
    return
}

# -------------------------------------------------------------------------
# 2. LOCALIZACIÓN DE LA CACHÉ WEB
# -------------------------------------------------------------------------
$webcachePath = Resolve-Path "$gamedir/webCaches" -ErrorAction SilentlyContinue
if (-not $webcachePath) {
    Write-Host "`n[ERROR] No se encontro la carpeta webCaches en $gamedir" -ForegroundColor Red
    return
}

$latestVer = Get-ChildItem -Path $webcachePath | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $latestVer) {
    Write-Host "`n[ERROR] No se encontraron carpetas de version en webCaches." -ForegroundColor Red
    return
}

$cacheVerPath = Get-Item $latestVer.FullName
$cachefile = Resolve-Path "$cacheVerPath/Cache/Cache_Data/data_2" -ErrorAction SilentlyContinue
if (-not $cachefile) {
    Write-Host "`n[ERROR] No se encontro el archivo data_2 de cache web." -ForegroundColor Red
    return
}

$tmpfile = "$env:TEMP/ch_data_2"
Copy-Item $cachefile -Destination $tmpfile -Force

function Test-WishUrl($url) {
    $uri = [System.UriBuilder]::New($url)
    $uri.Path = "gacha_info/api/getGachaLog"
    $uri.Host = $apiHost
    $uri.Fragment = ""
    $params = [System.Web.HttpUtility]::ParseQueryString($uri.Query)
    $params.Set("lang", "es")
    $params.Set("gacha_type", "301")
    $params.Set("size", "5")
    $uri.Query = $params.ToString()

    try {
        $wc = New-Object System.Net.WebClient
        $wc.Encoding = [System.Text.Encoding]::UTF8
        $raw = $wc.DownloadString($uri.Uri.AbsoluteUri)
        $resp = $raw | ConvertFrom-Json
        return ($resp.retcode -eq 0)
    } catch {
        return $false
    }
}

$content = Get-Content -Encoding UTF8 -Raw $tmpfile
$splitted = $content -split "1/0/"
$found = $splitted -match "webview_gacha"
$validUrl = $null

Write-Host "Buscando enlace de deseos activo en la cache..." -ForegroundColor Cyan

for ($i = $found.Length - 1; $i -ge 0; $i -= 1) {
    if ($found[$i] -match "(https.+?game_biz=)") {
        $candidateLink = $matches[0]
        Write-Host "`rComprobando enlace $($found.Length - $i) de $($found.Length)..." -NoNewline
        if (Test-WishUrl $candidateLink) {
            $validUrl = $candidateLink
            break
        }
        Start-Sleep -Milliseconds 150
    }
}

Remove-Item $tmpfile -Force -ErrorAction SilentlyContinue
Write-Host ""

if (-not $validUrl) {
    Write-Host "`n[ERROR] No se encontro un enlace valido o la sesion ha expirado." -ForegroundColor Red
    Write-Host "Solucion rapida (30 segundos):" -ForegroundColor Yellow
    Write-Host " 1. En Genshin Impact abre Deseos (F3) -> 'Historial'." -ForegroundColor White
    Write-Host " 2. Haz clic en la flecha para pasar de pagina una vez (esto renueva la clave authkey)." -ForegroundColor White
    Write-Host " 3. Vuelve a ejecutar este comando.`n" -ForegroundColor White
    return
}

# Copiar el enlace oficial directamente al portapapeles
Set-Clipboard -Value $validUrl

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " [OK] ¡Enlace de deseos obtenido exitosamente!" -ForegroundColor Green
Write-Host " [OK] Copiado automaticamente al portapapeles." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "`nEnlace listo para pegar en Spirifly:`n" -ForegroundColor Yellow
Write-Host $validUrl -ForegroundColor Gray
Write-Host ""
Write-Host "Pega el enlace en Spirifly (Paso 4) y haz clic en 'Importar Deseos'." -ForegroundColor White
Write-Host ""
