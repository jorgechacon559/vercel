# 🚀 DEPLOY A VERCEL - INSTRUCCIONES PASO A PASO

## ✅ BUILD COMPLETADO
Tu aplicación está lista en: `C:\Users\alexc\Downloads\Mundial\6-440517cd12a6\dist\`

## 📝 PASOS PARA VERCEL

### 1. Ir a Vercel
- Abre tu navegador
- Ve a: **https://vercel.com**
- Haz clic en **"Start Deploying"** o **"Sign Up"**

### 2. Crear cuenta
- Usa tu cuenta de **GitHub**, **GitLab** o **email**
- Confirma tu email si es necesario

### 3. Deploy tu aplicación
**OPCIÓN A: Arrastrar y soltar (MÁS FÁCIL)**
- Una vez en el dashboard de Vercel
- Busca la sección **"Import Project"** o **"New Project"**
- Arrastra la carpeta completa: `C:\Users\alexc\Downloads\Mundial\6-440517cd12a6\dist\`
- O haz clic en **"Browse"** y selecciona la carpeta `dist`

**OPCIÓN B: Subir ZIP**
- Comprime la carpeta `dist` en un archivo ZIP
- Sube el archivo ZIP a Vercel

### 4. Configurar el proyecto
- **Project Name:** `fifa-mundial-2026` (o el que prefieras)
- **Framework Preset:** Expo/React (se detecta automáticamente)
- Haz clic en **"Deploy"**

### 5. ¡ESPERAR! 
- Vercel construirá tu aplicación (1-3 minutos)
- Te dará una URL como: `https://fifa-mundial-2026.vercel.app`

## 🔧 CONFIGURAR SUPABASE CON LA NUEVA URL

### 1. Copiar tu nueva URL de Vercel
- Ejemplo: `https://fifa-mundial-2026.vercel.app`

### 2. Ir a Supabase Dashboard
- Ve a: https://supabase.com/dashboard
- Selecciona tu proyecto FIFA Mundial 2026

### 3. Configurar Authentication
- Ve a **Authentication > Settings > URL Configuration**
- **Site URL:** `https://fifa-mundial-2026.vercel.app`
- **Additional Redirect URLs:**
  ```
  https://fifa-mundial-2026.vercel.app
  https://fifa-mundial-2026.vercel.app/auth/callback
  http://localhost:8081 (para desarrollo)
  ```

### 4. Guardar cambios
- Haz clic en **"Save"**

## ✅ RESULTADO FINAL

Una vez completado:
- ✅ Tu aplicación estará en una URL pública
- ✅ Los enlaces de confirmación funcionarán en cualquier dispositivo
- ✅ Podrás compartir la app con anyone
- ✅ SSL automático (HTTPS)
- ✅ Listo para producción

### URLs importantes:
- **Tu app:** https://fifa-mundial-2026.vercel.app
- **Supabase:** https://supabase.com/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard

## 🚨 DESPUÉS DEL DEPLOY

### Actualizar tu archivo de servicio
Cuando tengas la URL de Vercel, actualiza:
```typescript
// En services/ProductionAuthService.ts
redirectTo: 'https://fifa-mundial-2026.vercel.app/reset-password'
```

## 🎉 ¡LISTO!
Una vez hecho esto, tu sistema de autenticación funcionará perfectamente desde cualquier dispositivo.

¿Tienes alguna pregunta sobre algún paso?
