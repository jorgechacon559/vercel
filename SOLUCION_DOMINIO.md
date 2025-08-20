# 🌐 CONFIGURACIÓN DE DOMINIO GRATUITO PARA PRODUCCIÓN

## 🎯 PROBLEMA ACTUAL
- Los enlaces de confirmación van a `localhost:8081`
- Solo funcionan en tu computadora
- Los usuarios no pueden confirmar emails desde otros dispositivos

## ✅ SOLUCIONES DISPONIBLES

### 🆓 OPCIÓN 1: DOMINIOS GRATUITOS
**Recomendado para testing y desarrollo:**

1. **Vercel (GRATIS)**
   - Dominio: `tu-app.vercel.app`
   - Deploy automático desde GitHub
   - SSL gratuito
   - URL: https://vercel.com

2. **Netlify (GRATIS)**
   - Dominio: `tu-app.netlify.app`
   - Deploy desde carpeta
   - SSL gratuito
   - URL: https://netlify.com

3. **GitHub Pages (GRATIS)**
   - Dominio: `usuario.github.io/fifa-mundial`
   - Directo desde repositorio
   - SSL gratuito

### 🌐 OPCIÓN 2: DOMINIO PERSONALIZADO
**Para producción real:**

1. **Dominios baratos:**
   - Namecheap: ~$1-3/año (.tk, .ml, .ga)
   - Freenom: Gratis (.tk, .ml, .ga, .cf)
   - Google Domains: ~$12/año (.com)

## 🚀 RECOMENDACIÓN INMEDIATA

### Para desarrollo/testing:
```bash
# Deploy en Vercel (5 minutos)
1. Crear cuenta en vercel.com
2. Conectar repositorio de GitHub
3. Deploy automático
4. Obtener URL: https://fifa-mundial-2026.vercel.app
```

### Para producción:
```bash
# Dominio personalizado
1. Comprar dominio: fifamundial2026.com
2. Configurar DNS en Vercel/Netlify
3. URLs profesionales: https://fifamundial2026.com
```

## ⚙️ CONFIGURACIÓN EN SUPABASE

Una vez que tengas tu dominio:

### 1. Ir a Supabase Dashboard
- https://supabase.com/dashboard
- Seleccionar tu proyecto

### 2. Configurar URLs
**Authentication > Settings > URL Configuration:**
```
Site URL: https://fifa-mundial-2026.vercel.app
Additional Redirect URLs:
- https://fifa-mundial-2026.vercel.app
- https://fifa-mundial-2026.vercel.app/auth/callback
- http://localhost:8081 (para desarrollo)
```

### 3. Configurar Email Templates
**Authentication > Email Templates:**
```
Confirm Signup:
Site URL: {{ .SiteURL }}
Redirect URL: {{ .SiteURL }}/auth/callback
```

## 📱 DEPLOYMENT PASO A PASO

### VERCEL (Recomendado):
```bash
# 1. Crear build para web
cd "C:\Users\alexc\Downloads\Mundial\6-440517cd12a6"
npx expo export -p web

# 2. Subir carpeta dist/ a Vercel
# 3. Configurar dominio en Supabase
# 4. ¡Listo!
```

### NETLIFY:
```bash
# 1. Crear build
npx expo export -p web

# 2. Ir a netlify.com
# 3. Arrastrar carpeta dist/
# 4. Obtener URL
```

## 🔄 ACTUALIZAR CONFIGURACIÓN

Una vez que tengas tu dominio, actualizar:

### En Supabase:
- Site URL: Tu nueva URL
- Redirect URLs: Tu nueva URL + /auth/callback

### En la app:
- Actualizar redirectTo en resetPassword()
- Probar confirmación de email
- ¡Funcionará en cualquier dispositivo!

## 🎯 RESULTADO FINAL
- ✅ Confirmación de email funciona en cualquier dispositivo
- ✅ URL profesional para compartir
- ✅ SSL automático (HTTPS)
- ✅ Listo para publicar en stores
- ✅ Escalable a millones de usuarios

¿Prefieres que configuremos Vercel ahora o necesitas ayuda con otra plataforma?
