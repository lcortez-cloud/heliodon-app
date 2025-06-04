@echo off
echo Verificando instalação do Node.js...
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
  echo Node.js não está instalado.
  echo Por favor, instale o Node.js manualmente em https://nodejs.org
  pause
  exit
)

echo Instalando dependências do projeto...
npm install

echo Criando atalho na área de trabalho...

set SHORTCUT_NAME=HeliodonApp
set TARGET_PATH=%CD%\start.bat
set DESKTOP_PATH=%USERPROFILE%\Desktop

echo Set o script PowerShell para criar o atalho...
powershell -Command "$s=(New-Object -COM WScript.Shell).CreateShortcut('%DESKTOP_PATH%\%SHORTCUT_NAME%.lnk');$s.TargetPath='%TARGET_PATH%';$s.WorkingDirectory='%CD%';$s.Save()"

echo Atalho criado na área de trabalho com sucesso.
pause