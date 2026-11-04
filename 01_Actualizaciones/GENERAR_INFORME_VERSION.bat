@echo off
setlocal
chcp 65001 >nul
set "SPIRIFLY_SCRIPT="
if exist "%~dp0version-pipeline.cjs" set "SPIRIFLY_SCRIPT=%~dp0version-pipeline.cjs"
if not defined SPIRIFLY_SCRIPT if exist "%~dp001_Actualizaciones\version-pipeline.cjs" set "SPIRIFLY_SCRIPT=%~dp001_Actualizaciones\version-pipeline.cjs"
if not defined SPIRIFLY_SCRIPT if exist "%USERPROFILE%\Documents\Spirifly\01_Actualizaciones\version-pipeline.cjs" set "SPIRIFLY_SCRIPT=%USERPROFILE%\Documents\Spirifly\01_Actualizaciones\version-pipeline.cjs"
if not defined SPIRIFLY_SCRIPT (
  echo ERROR: No se encontro el proyecto Spirifly.
  echo Ubica este BAT junto a version-pipeline.cjs en la carpeta 01_Actualizaciones del proyecto.
  pause
  exit /b 1
)
where node >nul 2>nul || (echo ERROR: Instala Node.js 18 o superior. & pause & exit /b 1)
echo GENERAR INFORME DE NUEVA VERSION
echo Preparacion durante la predescarga de cada version.
echo Consulta personajes, materiales, flores, armas, dominios y guias de builds.
echo Genera informe y copias en formato Spirifly para revisarlas antes de incorporarlas a local.
echo.
node "%SPIRIFLY_SCRIPT%" %*
set "RESULTADO=%ERRORLEVEL%"
if "%RESULTADO%"=="2" echo ATENCION: Paquete incompleto. Revisa formato_web\COBERTURA.md en la carpeta del resultado.
if "%RESULTADO%"=="1" echo ERROR: La consulta no pudo completarse. Revisa el detalle anterior.
pause
exit /b %RESULTADO%
