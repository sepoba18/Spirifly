Add-Type -AssemblyName System.Web

$logLocation = "%userprofile%\AppData\LocalLow\miHoYo\Genshin Impact\output_log.txt";
$logLocationChina = "%userprofile%\AppData\LocalLow\miHoYo\$([char]0x539f)$([char]0x795e)\output_log.txt";

$reg = $args[0]
$apiHost = "public-operation-hk4e-sg.hoyoverse.com" 
if ($reg -eq "china") {
  Write-Host "Usando ubicacion de cache para China..." -ForegroundColor Yellow
  $logLocation = $logLocationChina
  $apiHost = "public-operation-hk4e.mihoyo.com"
}

$tmps = $env:TEMP + '\get_wish_link.ps1';
if ([System.IO.File]::Exists($tmps)) {
  Remove-Item $tmps -Force -ErrorAction SilentlyContinue
}

$path = [System.Environment]::ExpandEnvironmentVariables($logLocation);
if (-Not [System.IO.File]::Exists($path)) {
    Write-Host "`n[ERROR] No se encontro el archivo de registro (output_log.txt)." -ForegroundColor Red
    Write-Host "Asegurate de abrir el Historial de Deseos dentro de Genshin Impact primero!`n" -ForegroundColor Yellow

    if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {  
        Write-Host "¿Deseas intentar ejecutar el script como Administrador? Presiona [ENTER] para continuar o cualquier tecla para cancelar."
        $keyInput = [Console]::ReadKey($true).Key
        if ($keyInput -ne "13") {
            return
        }

        $myinvocation.mycommand.definition > $tmps
        Start-Process powershell -Verb runAs -ArgumentList "-noexit", $tmps, $reg
        break
    }

    return
}

$logs = Get-Content -Path $path
$m = $logs -match "(?m).:/.+(GenshinImpact_Data|YuanShen_Data)"
$m[0] -match "(.:/.+(GenshinImpact_Data|YuanShen_Data))" >$null

if ($matches.Length -eq 0) {
    Write-Host "`n[ERROR] No se pudo encontrar el directorio del juego en el registro." -ForegroundColor Red
    Write-Host "Abre el juego, entra a Deseos (F3) -> Historial y vuelve a intentar.`n" -ForegroundColor Yellow
    return
}

$gamedir = $matches[1]
$webcachePath = Resolve-Path "$gamedir/webCaches" -ErrorAction SilentlyContinue
if (-Not $webcachePath) {
    Write-Host "`n[ERROR] No se encontro la carpeta webCaches en $gamedir" -ForegroundColor Red
    return
}

$latestVer = Get-ChildItem -Path $webcachePath | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-Not $latestVer) {
    Write-Host "`n[ERROR] No se encontraron carpetas de version en webCaches." -ForegroundColor Red
    return
}

$cacheVerPath = Get-Item $latestVer.FullName
$cachefile = Resolve-Path "$cacheVerPath/Cache/Cache_Data/data_2" -ErrorAction SilentlyContinue
if (-Not $cachefile) {
    Write-Host "`n[ERROR] No se encontro el archivo data_2 de cache web." -ForegroundColor Red
    return
}

$tmpfile = "$env:TEMP/ch_data_2"
Copy-Item $cachefile -Destination $tmpfile -Force

function testUrl($url) {
  $ProgressPreference = 'SilentlyContinue'
  $uri = [System.UriBuilder]::New($url)
  $uri.Path = "gacha_info/api/getGachaLog"
  $uri.Host = $apiHost
  $uri.Fragment = ""
  $params = [System.Web.HttpUtility]::ParseQueryString($uri.Query)
  $params.Set("lang", "en");
  $params.Set("gacha_type", 301);
  $params.Set("size", "5");
  $params.Add("lang", "en-us");
  $uri.Query = $params.ToString()
  $apiUrl = $uri.Uri.AbsoluteUri

  try {
    $response = Invoke-WebRequest -Uri $apiUrl -ContentType "application/json" -UseBasicParsing -TimeoutSec 10 | ConvertFrom-Json
    return ($response.retcode -eq 0)
  } catch {
    return $false
  }
}

$content = Get-Content -Encoding UTF8 -Raw $tmpfile
$splitted = $content -split "1/0/"
$found = $splitted -match "webview_gacha"
$link = $false
$linkFound = $false

Write-Host "Buscando enlace de deseos activo en la cache..." -ForegroundColor Cyan

for ($i = $found.Length - 1; $i -ge 0; $i -= 1) {
  $t = $found[$i] -match "(https.+?game_biz=)"
  $link = $matches[0]
  Write-Host "`rComprobando enlace $($found.Length - $i) de $($found.Length)..." -NoNewline
  $testResult = testUrl $link
  if ($testResult -eq $true) {
    $linkFound = $true
    break
  }
  Start-Sleep -Milliseconds 200
}

Remove-Item $tmpfile -Force -ErrorAction SilentlyContinue

Write-Host ""

if (-Not $linkFound) {
  Write-Host "`n[ERROR] No se pudo encontrar un enlace valido o ha expirado." -ForegroundColor Red
  Write-Host "Por favor realiza estos sencillos pasos:" -ForegroundColor Yellow
  Write-Host " 1. En Genshin Impact abre el menu de Deseos (F3)." -ForegroundColor White
  Write-Host " 2. Haz clic en 'Historial'." -ForegroundColor White
  Write-Host " 3. Pasa a la siguiente pagina una vez para refrescar la sesion." -ForegroundColor White
  Write-Host " 4. Vuelve a ejecutar este comando.`n" -ForegroundColor White
  return
}

$wishHistoryUrl = $link

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " [OK] Enlace de deseos obtenido exitosamente!" -ForegroundColor Green
Write-Host " [OK] Copiado automaticamente al portapapeles." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "`nPega el enlace en tu aplicacion web para importar tus deseos:`n" -ForegroundColor Yellow
Write-Host $wishHistoryUrl
Write-Host ""

Set-Clipboard -Value $wishHistoryUrl
