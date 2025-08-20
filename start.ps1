# FIFA Mundial 2026 - Script de Inicialización
# PowerShell script para configurar y ejecutar la aplicación

Write-Host "🏆 FIFA Mundial 2026 - Portal Oficial 🏆" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Verificar si Node.js está instalado
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no encontrado. Por favor instala Node.js desde https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Verificar si npm está disponible
Write-Host "🔍 Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no encontrado" -ForegroundColor Red
    exit 1
}

# Instalar dependencias si no existen
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencias ya instaladas" -ForegroundColor Green
}

# Verificar que los juegos HTML estén en public/
Write-Host "🎮 Verificando juegos..." -ForegroundColor Yellow

$quinielaFile = "public/FIFA2026_QuinielaEstilo.html"
$memoramaFile = "public/FIFA26Memorama.html"
$executableFile = "FIFA2026_SimpleGame.exe"

if (Test-Path $quinielaFile) {
    Write-Host "✅ Quiniela FIFA encontrada" -ForegroundColor Green
} else {
    Write-Host "⚠️  Copiando Quiniela FIFA a public/" -ForegroundColor Yellow
    Copy-Item "FIFA2026_QuinielaEstilo.html" "public/" -ErrorAction SilentlyContinue
}

if (Test-Path $memoramaFile) {
    Write-Host "✅ Memorama FIFA encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Copiando Memorama FIFA a public/" -ForegroundColor Yellow
    Copy-Item "FIFA26Memorama.html" "public/" -ErrorAction SilentlyContinue
}

if (Test-Path $executableFile) {
    $sizeInMB = [math]::Round((Get-Item $executableFile).Length / 1MB, 1)
    Write-Host "✅ Juego ejecutable encontrado ($sizeInMB MB)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Juego ejecutable no encontrado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 ¡Todo listo! Opciones de inicio:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Desarrollo Web (Recomendado):" -ForegroundColor White
Write-Host "   npm run web" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Desarrollo con Túnel (para móviles):" -ForegroundColor White
Write-Host "   npm run tunnel" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Android (requiere emulador):" -ForegroundColor White
Write-Host "   npm run android" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  iOS (requiere macOS y simulador):" -ForegroundColor White
Write-Host "   npm run ios" -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣  Solo juegos HTML (directo):" -ForegroundColor White
Write-Host "   .\FIFA2026_QuinielaEstilo.html" -ForegroundColor Gray
Write-Host "   .\FIFA26Memorama.html" -ForegroundColor Gray
Write-Host ""
Write-Host "6️⃣  Juego ejecutable:" -ForegroundColor White
Write-Host "   .\FIFA2026_SimpleGame.exe" -ForegroundColor Gray
Write-Host ""

# Preguntar si quiere iniciar automáticamente
$response = Read-Host "¿Iniciar desarrollo web automáticamente? (y/N)"
if ($response -eq "y" -or $response -eq "Y" -or $response -eq "yes") {
    Write-Host ""
    Write-Host "🌐 Iniciando servidor de desarrollo..." -ForegroundColor Cyan
    Write-Host "La aplicación se abrirá en http://localhost:8081" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📌 Acceso directo a juegos:" -ForegroundColor Yellow
    Write-Host "   Quiniela: http://localhost:8081/FIFA2026_QuinielaEstilo.html" -ForegroundColor Gray
    Write-Host "   Memorama: http://localhost:8081/FIFA26Memorama.html" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Para detener el servidor, presiona Ctrl+C" -ForegroundColor Yellow
    Write-Host ""
    
    # Esperar un momento para que el usuario lea
    Start-Sleep -Seconds 3
    
    # Iniciar el servidor
    npm run web
} else {
    Write-Host ""
    Write-Host "✨ Configuración completada. ¡Que disfrutes el Mundial 2026! ✨" -ForegroundColor Green
}
