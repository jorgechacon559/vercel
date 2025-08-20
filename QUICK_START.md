# 🚀 FIFA Mundial 2026 - Guía de Inicio Rápido

## ⚡ Instalación Rápida

```bash
# 1. Navegar al directorio del proyecto
cd "c:\Users\alexc\Downloads\Mundial\6-440517cd12a6"

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo web (recomendado para desarrollo)
npm run web
```

## 🎮 Acceso a los Juegos

### Opción 1: Directamente en el navegador
Una vez iniciado el servidor de desarrollo:

- **Quiniela FIFA 2026**: http://localhost:8081/FIFA2026_QuinielaEstilo.html
- **Memorama FIFA**: http://localhost:8081/FIFA26Memorama.html

### Opción 2: Desde la app
1. Abrir http://localhost:8081 en el navegador
2. Navegar a la pestaña "Juegos"
3. Seleccionar el juego deseado

### Opción 3: Juego ejecutable
- Ejecutar directamente `FIFA2026_SimpleGame.exe` (requiere Windows)

## 📱 Modos de Desarrollo

```bash
# Web (navegador)
npm run web

# Simulador iOS (requiere macOS)
npm run ios

# Emulador Android (requiere Android Studio)
npm run android

# Tunnel mode (acceso desde dispositivos físicos)
npm run dev
```

## 🎯 Características Principales Implementadas

✅ **Aplicación Base**
- ✅ Configuración Expo con TypeScript
- ✅ Navegación por tabs (Inicio, Juegos, Noticias)
- ✅ Sistema de autenticación básico
- ✅ Temática FIFA 2026 oficial

✅ **Localización en Español**
- ✅ Todas las pantallas traducidas
- ✅ Configuración regional ES
- ✅ Títulos y descripciones actualizados

✅ **3 Juegos Integrados**
- ✅ Quiniela Mundial (HTML5)
- ✅ Memorama FIFA (HTML5)
- ✅ Juego Arcade (Ejecutable)

✅ **Temática Dinámica**
- ✅ Colores oficiales FIFA 2026
- ✅ Tipografías deportivas modernas
- ✅ Iconografía temática
- ✅ Efectos visuales mejorados

## 🛠️ Personalización

### Cambiar Colores
Editar `styles/commonStyles.ts`:
```typescript
export const colors = {
  primary: '#007748', // Verde FIFA oficial
  secondary: '#FFD700', // Dorado
  accent: '#FF6B00', // Naranja vibrante
  // ... más colores
};
```

### Agregar Noticias
Editar `app/(tabs)/news.tsx` - modificar el array `newsItems`

### Personalizar Juegos
- Los juegos HTML están en la carpeta `public/`
- Modificar directamente los archivos `.html`
- Los cambios se reflejan automáticamente

## 🔧 Solución de Problemas

### Error: "Module not found"
```bash
# Limpiar cache y reinstalar
npm clean-install
```

### Los juegos no cargan
1. Verificar que los archivos HTML estén en `public/`
2. Comprobar la consola del navegador para errores
3. Asegurar que el servidor de desarrollo esté corriendo

### App no inicia en móvil
```bash
# Usar tunnel mode para acceso remoto
npm run dev
```

## 📋 Lista de Verificación de Funcionalidades

### ✅ App Principal
- [x] Pantalla de login en español
- [x] Pantalla de registro en español
- [x] Navegación principal traducida
- [x] Home con contenido FIFA 2026
- [x] Sección de noticias actualizada

### ✅ Juegos
- [x] Quiniela - Accesible desde app y directo
- [x] Memorama - Accesible desde app y directo
- [x] Ejecutable - Informativo para descarga

### ✅ Configuración
- [x] Manifest.json actualizado
- [x] Íconos y tema FIFA 2026
- [x] PWA configurada
- [x] SEO optimizado

## 🎨 Vista Previa de Pantallas

1. **Login**: Bienvenido de vuelta + temática FIFA
2. **Home**: Portal FIFA 2026 con noticias
3. **Juegos**: 3 tarjetas con juegos disponibles
4. **Noticias**: Feed actualizado de FIFA 2026

## 🚀 ¡Listo para Jugar!

La aplicación está completamente configurada y lista para uso. Los 3 juegos están integrados y funcionando. ¡Disfruta explorando el mundo del FIFA Mundial 2026!

---
**Hecho con ❤️ para fanáticos del fútbol**
