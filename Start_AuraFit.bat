@echo off
title AuraFit iOS
cd /d "%~dp0"
chcp 65001 >nul
echo Запуск AuraFit iOS...
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1"
if %errorlevel% neq 0 (
    echo.
    echo Не удалось запустить сервер PowerShell. Открываем автономный файл напрямую...
    start "" "%~dp0AuraFit_iOS.html"
)
pause