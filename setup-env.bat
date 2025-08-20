@echo off
REM FIFA Mundial 2026 - Variables de entorno para Windows
REM Este archivo configura las variables necesarias para desarrollo

REM Deshabilitar telemetría de Expo
set EXPO_NO_TELEMETRY=1

REM Configuración de Node.js
set NODE_ENV=development

REM URLs de desarrollo
set EXPO_DEV_URL=http://localhost:8081
set QUINIELA_GAME_URL=/FIFA2026_QuinielaEstilo.html
set MEMORAMA_GAME_URL=/FIFA26Memorama.html

REM Configuración de la app
set APP_NAME=FIFA Mundial 2026
set APP_SHORT_NAME=FIFA 2026
set APP_VERSION=1.0.0

echo ✅ Variables de entorno configuradas para FIFA Mundial 2026
echo 🌐 URL de desarrollo: %EXPO_DEV_URL%
echo 🎮 Juegos disponibles:
echo    - Quiniela: %EXPO_DEV_URL%%QUINIELA_GAME_URL%
echo    - Memorama: %EXPO_DEV_URL%%MEMORAMA_GAME_URL%
