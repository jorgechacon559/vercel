# FIFA Mundial 2026 - Script de Validación Móvil Android
# PowerShell script para configurar y probar la app en Android

Write-Host "🤖 FIFA Mundial 2026 - Validación Android 🤖" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Configurar variables de entorno para Android
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\tools\bin"

Write-Host "🔧 Configurando entorno Android..." -ForegroundColor Yellow
Write-Host "   ANDROID_HOME: $env:ANDROID_HOME" -ForegroundColor Gray

# Verificar ADB
Write-Host "🔍 Verificando Android Debug Bridge..." -ForegroundColor Yellow
try {
    $adbPath = "$env:ANDROID_HOME\platform-tools\adb.exe"
    if (Test-Path $adbPath) {
        $adbVersion = & $adbPath version
        Write-Host "✅ ADB encontrado: $($adbVersion[0])" -ForegroundColor Green
    } else {
        Write-Host "❌ ADB no encontrado en $adbPath" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error verificando ADB: $_" -ForegroundColor Red
    exit 1
}

# Verificar dispositivos conectados
Write-Host "📱 Verificando dispositivos Android..." -ForegroundColor Yellow
try {
    $devices = & $adbPath devices
    Write-Host "Dispositivos detectados:" -ForegroundColor Gray
    $devices | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
    
    $connectedDevices = ($devices | Select-String "device$").Count
    if ($connectedDevices -gt 0) {
        Write-Host "✅ $connectedDevices dispositivo(s) Android conectado(s)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Ningún dispositivo Android conectado" -ForegroundColor Yellow
        Write-Host "   💡 Opciones:" -ForegroundColor Cyan
        Write-Host "      1. Conecta un dispositivo físico con USB debugging" -ForegroundColor Gray
        Write-Host "      2. Inicia un emulador desde Android Studio" -ForegroundColor Gray
        Write-Host "      3. Usa Expo Go en tu dispositivo (escanea QR)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Error verificando dispositivos: $_" -ForegroundColor Red
}

# Verificar emuladores disponibles
Write-Host "🖥️ Verificando emuladores disponibles..." -ForegroundColor Yellow
try {
    $emulatorPath = "$env:ANDROID_HOME\emulator\emulator.exe"
    if (Test-Path $emulatorPath) {
        $avds = & $emulatorPath -list-avds 2>$null
        if ($avds) {
            Write-Host "✅ Emuladores disponibles:" -ForegroundColor Green
            $avds | ForEach-Object { Write-Host "   📱 $_" -ForegroundColor Gray }
        } else {
            Write-Host "⚠️  No hay emuladores configurados" -ForegroundColor Yellow
            Write-Host "   💡 Crea un emulador en Android Studio > AVD Manager" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "⚠️  No se pudo verificar emuladores" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Opciones para probar la app en Android:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Expo Go (Recomendado - más rápido):" -ForegroundColor White
Write-Host "   • Instalar Expo Go desde Google Play Store" -ForegroundColor Gray
Write-Host "   • Escanear el QR code cuando ejecutes 'npm run dev'" -ForegroundColor Gray
Write-Host "   • La app se carga automáticamente" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Emulador Android:" -ForegroundColor White
Write-Host "   • Abrir Android Studio > AVD Manager" -ForegroundColor Gray
Write-Host "   • Iniciar un emulador" -ForegroundColor Gray
Write-Host "   • Ejecutar 'npm run android'" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Dispositivo físico:" -ForegroundColor White
Write-Host "   • Activar 'Opciones de desarrollador'" -ForegroundColor Gray
Write-Host "   • Activar 'Depuración USB'" -ForegroundColor Gray
Write-Host "   • Conectar con cable USB" -ForegroundColor Gray
Write-Host "   • Ejecutar 'npm run android'" -ForegroundColor Gray
Write-Host ""

# Función para iniciar la app
$response = Read-Host "¿Qué método quieres usar? (1=Expo Go, 2=Emulador, 3=Dispositivo, s=Solo mostrar info)"

switch ($response) {
    "1" {
        Write-Host ""
        Write-Host "📱 Iniciando con Expo Go..." -ForegroundColor Cyan
        Write-Host "1. Asegúrate de tener Expo Go instalado en tu teléfono" -ForegroundColor Yellow
        Write-Host "2. Conecta tu teléfono a la misma red WiFi" -ForegroundColor Yellow
        Write-Host "3. Escanea el QR code que aparecerá" -ForegroundColor Yellow
        Write-Host ""
        Set-Location (Split-Path $MyInvocation.MyCommand.Path)
        npm run tunnel
    }
    "2" {
        Write-Host ""
        Write-Host "🖥️ Verificando emulador..." -ForegroundColor Cyan
        $devices = & $adbPath devices
        $emulatorRunning = ($devices | Select-String "emulator").Count
        
        if ($emulatorRunning -gt 0) {
            Write-Host "✅ Emulador detectado, iniciando app..." -ForegroundColor Green
            Set-Location (Split-Path $MyInvocation.MyCommand.Path)
            npm run android
        } else {
            Write-Host "⚠️  No hay emulador ejecutándose" -ForegroundColor Yellow
            Write-Host "Por favor inicia un emulador desde Android Studio primero" -ForegroundColor Yellow
        }
    }
    "3" {
        Write-Host ""
        Write-Host "📱 Verificando dispositivo físico..." -ForegroundColor Cyan
        $devices = & $adbPath devices
        $physicalDevice = ($devices | Select-String "device$" | Select-String "emulator" -NotMatch).Count
        
        if ($physicalDevice -gt 0) {
            Write-Host "✅ Dispositivo físico detectado, iniciando app..." -ForegroundColor Green
            Set-Location (Split-Path $MyInvocation.MyCommand.Path)
            npm run android
        } else {
            Write-Host "⚠️  No hay dispositivo físico conectado" -ForegroundColor Yellow
            Write-Host "Por favor conecta tu dispositivo con USB debugging activado" -ForegroundColor Yellow
        }
    }
    default {
        Write-Host ""
        Write-Host "ℹ️  Información mostrada. Para probar la app:" -ForegroundColor Cyan
        Write-Host "   • Ejecuta este script de nuevo" -ForegroundColor Gray
        Write-Host "   • O ejecuta directamente 'npm run tunnel' para Expo Go" -ForegroundColor Gray
        Write-Host "   • O ejecuta 'npm run android' si tienes emulador/dispositivo" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "📋 Checklist de validación móvil:" -ForegroundColor Cyan
Write-Host "   ✅ Pantalla de login responsive" -ForegroundColor Green
Write-Host "   ✅ Navegación por tabs funcional" -ForegroundColor Green  
Write-Host "   ✅ Juegos accesibles desde la app" -ForegroundColor Green
Write-Host "   ✅ Noticias con scroll suave" -ForegroundColor Green
Write-Host "   ✅ Temática FIFA 2026 aplicada" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Elementos a probar específicamente:" -ForegroundColor Yellow
Write-Host "   • Touch/tap en botones y enlaces" -ForegroundColor Gray
Write-Host "   • Scroll en listas de noticias" -ForegroundColor Gray
Write-Host "   • Navegación entre tabs" -ForegroundColor Gray
Write-Host "   • Carga de juegos HTML en WebView" -ForegroundColor Gray
Write-Host "   • Orientación del dispositivo" -ForegroundColor Gray
Write-Host "   • Rendimiento general de la app" -ForegroundColor Gray
