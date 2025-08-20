# FIFA Mundial 2026 - Portal Oficial

Una aplicación React Native/Expo completa que celebra el Mundial FIFA 2026 con juegos interactivos, noticias y experiencias inmersivas.

## 🚀 Características Principales

### 🎮 Tres Juegos Integrados
1. **Quiniela Mundial** (`FIFA2026_QuinielaEstilo.html`)
   - Juego estilo quiniela con temática FIFA 2026
   - Interfaz moderna con animaciones CSS
   - Sistema de puntuación dinámico

2. **Memorama FIFA** (`FIFA26Memorama.html`)
   - Juego de memoria con iconos del Mundial
   - Estilo arcade con efectos visuales
   - Múltiples niveles de dificultad

3. **Juego Arcade Clásico** (`FIFA2026_SimpleGame.exe`)
   - Experiencia de juego completa (29MB)
   - Gráficos avanzados
   - Mecánicas de juego clásicas

### 📱 Funcionalidades de la App
- **Autenticación**: Sistema de login/registro en español
- **Navegación por Tabs**: Inicio, Juegos, Noticias
- **Noticias FIFA**: Últimas actualizaciones del Mundial 2026
- **Diseño Responsivo**: Optimizado para móvil y web
- **PWA Ready**: Installable como Progressive Web App

## 🎨 Temática y Diseño

### Colores FIFA 2026 Oficiales
- **Verde Primario**: `#007748` - Color oficial FIFA
- **Dorado**: `#FFD700` - Elegancia y prestigio
- **Naranja**: `#FF6B00` - Energía y dinamismo
- **Azul FIFA**: `#003DA5` - Confianza institucional
- **Rojo FIFA**: `#D50000` - Pasión y emoción

### Tipografías
- **Principal**: Exo 2 - Moderna y deportiva
- **Accent**: Orbitron - Futurista para elementos especiales
- **Display**: Audiowide - Para títulos impactantes

## 🛠️ Tecnologías Utilizadas

- **React Native** con Expo
- **TypeScript** para tipado fuerte
- **Expo Router** para navegación
- **React Native Web** para soporte web
- **HTML5/CSS3** para juegos integrados
- **PWA** con Service Workers

## 📁 Estructura del Proyecto

```
fifa-mundial-2026/
├── app/                          # Pantallas de la aplicación
│   ├── (auth)/                   # Autenticación
│   │   ├── login.tsx            # Pantalla de inicio de sesión
│   │   └── register.tsx         # Pantalla de registro
│   ├── (tabs)/                  # Navegación principal
│   │   ├── home.tsx             # Pantalla de inicio
│   │   ├── games.tsx            # Selector de juegos
│   │   └── news.tsx             # Noticias FIFA
│   └── games/                   # Juegos específicos
│       └── webview.tsx          # Visor de juegos HTML
├── components/                  # Componentes reutilizables
├── styles/                      # Estilos compartidos
├── public/                      # Archivos estáticos
│   ├── FIFA2026_QuinielaEstilo.html    # Juego de quiniela
│   ├── FIFA26Memorama.html             # Juego de memoria
│   └── manifest.json                   # Configuración PWA
└── FIFA2026_SimpleGame.exe     # Juego ejecutable
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- Expo CLI
- Git

### Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Desarrollo web
npm run web

# Desarrollo móvil
npm run dev

# Construcción para producción
npm run build:web
```

### Acceso a Juegos

#### En Navegador Web
Los juegos HTML están disponibles directamente:
- Quiniela: `/FIFA2026_QuinielaEstilo.html`
- Memorama: `/FIFA26Memorama.html`

#### En Dispositivo Móvil
Los juegos se abren a través del WebView integrado desde la sección "Juegos" de la app.

#### Juego Ejecutable
El archivo `FIFA2026_SimpleGame.exe` (29MB) requiere descarga e instalación separada en Windows.

## 🌍 Localización

- **Idioma Principal**: Español (ES)
- **Configuración**: es-ES, UTF-8
- **Moneda**: Para elementos premium (futuro)
- **Zona Horaria**: UTC para eventos globales

## 📱 Compatibilidad

### Plataformas Soportadas
- ✅ **Web** (Chrome, Firefox, Safari, Edge)
- ✅ **iOS** (12.0+)
- ✅ **Android** (API 21+)
- ✅ **PWA** (Installable en dispositivos)

### Resoluciones Optimizadas
- 📱 **Móvil**: 375px - 768px
- 📱 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

## 🔒 Configuración de Seguridad

- Validación de entrada en formularios
- Sanitización de URLs para juegos
- Gestión segura de estados de autenticación
- Políticas CSP para contenido web

## 🎯 Próximas Características

### Versión 1.1
- [ ] Integración con APIs de FIFA real
- [ ] Sistema de puntuaciones global
- [ ] Notificaciones push para partidos
- [ ] Modo offline completo

### Versión 1.2
- [ ] Realidad aumentada para experiencias
- [ ] Streaming de partidos en vivo
- [ ] Red social de fanáticos
- [ ] Marketplace de merchandise

## 🤝 Contribución

Este proyecto forma parte del ecosistema FIFA Mundial 2026. Para contribuir:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Proyecto bajo licencia MIT - ver archivo `LICENSE` para detalles.

## 🏆 Créditos

- **Diseño**: Basado en lineamientos oficiales FIFA 2026
- **Juegos**: Desarrollados específicamente para este portal
- **Iconografía**: Font Awesome, Ionicons
- **Imágenes**: Unsplash (con atribución apropiada)

---

**Hecho con ❤️ para los fanáticos del fútbol mundial**

🌟 **¡Dale estrella al repo si te gusta el proyecto!** 🌟
