# CONFIGURACIÓN SUPABASE - FIFA MUNDIAL 2026

## Instrucciones para configurar Supabase:

### 1. Crear cuenta en Supabase
- Ir a: https://supabase.com
- Crear cuenta gratuita
- Verificar email

### 2. Crear nuevo proyecto
- Click en "New Project" 
- Nombre: "FIFA Mundial 2026"
- Base de datos password: (generar una segura)
- Región: Seleccionar la más cercana

### 3. Obtener las claves del proyecto
En el dashboard de tu proyecto:
- Ir a Settings > API
- Copiar:
  - Project URL
  - Project API Key (anon, public)

### 4. Configurar autenticación
En Authentication > Settings:
- Habilitar "Enable email confirmations"
- Configurar Email Templates (opcional)
- Configurar URL de redirect para confirmación

### 5. Variables que necesitamos:
```
SUPABASE_URL=tu-proyecto-url
SUPABASE_ANON_KEY=tu-anon-key
```

### 6. Configuración de seguridad:
- Configurar RLS (Row Level Security)
- Configurar policies de acceso
- Configurar rate limiting

## ¿Quieres que creemos el proyecto juntos o ya tienes las credenciales?
