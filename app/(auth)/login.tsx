import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, Alert, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { commonStyles, colors } from '@/styles/commonStyles';
import { ProductionAuthService, ValidationUtils } from '@/services/ProductionAuthService';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Verificar sesión existente al cargar
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    const result = await ProductionAuthService.getCurrentSession();
    if (result.success && result.user) {
      router.replace('/(tabs)/home');
    }
  };

  // Validar campos
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = 'El email es requerido';
        } else if (!ValidationUtils.isValidEmail(value)) {
          newErrors.email = 'Ingresa un email válido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida';
        } else if (value.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
  };

  // Actualizar datos del formulario
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // Manejar login
  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (Object.keys(errors).length > 0) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    setIsLoading(true);

    try {
      const result = await ProductionAuthService.signIn(formData.email, formData.password);

      if (result.success) {
        Alert.alert(
          '✅ Bienvenido',
          '¡Has iniciado sesión exitosamente!',
          [
            {
              text: 'Continuar',
              onPress: () => router.replace('/(tabs)/home')
            }
          ]
        );
      } else {
        if (result.needsEmailConfirmation) {
          Alert.alert(
            '📧 Email no confirmado',
            'Necesitas confirmar tu email antes de iniciar sesión. ¿Quieres que reenviemos el email de confirmación?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { 
                text: 'Reenviar', 
                onPress: () => handleResendConfirmation(formData.email) 
              }
            ]
          );
        } else {
          Alert.alert('Error', result.error || 'No se pudo iniciar sesión');
        }
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      Alert.alert('Error', 'Ha ocurrido un error inesperado. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reenviar confirmación de email
  const handleResendConfirmation = async (email: string) => {
    setIsLoading(true);
    
    const result = await ProductionAuthService.resendEmailConfirmation(email);
    
    if (result.success) {
      Alert.alert('📧 Email Enviado', 'Hemos reenviado el email de confirmación');
    } else {
      Alert.alert('Error', result.error || 'No se pudo reenviar el email');
    }
    
    setIsLoading(false);
  };

  // Manejar recuperación de contraseña
  const handleForgotPassword = async () => {
    if (!formData.email) {
      Alert.alert('Error', 'Por favor ingresa tu email primero');
      return;
    }

    if (!ValidationUtils.isValidEmail(formData.email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);

    const result = await ProductionAuthService.resetPassword(formData.email);

    if (result.success) {
      Alert.alert(
        '📧 Email Enviado',
        `Hemos enviado las instrucciones de recuperación a ${formData.email}. Revisa tu bandeja de entrada y spam.`,
        [{ text: 'Entendido' }]
      );
      setShowForgotPassword(false);
    } else {
      Alert.alert('Error', result.error || 'No se pudo enviar el email de recuperación');
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={[commonStyles.title, { color: colors.primary, textAlign: 'center' }]}>
            🏆 FIFA Mundial 2026
          </Text>
          <Text style={[commonStyles.subtitle, { color: colors.textSecondary, textAlign: 'center' }]}>
            Bienvenido de vuelta
          </Text>
        </View>

        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        {errors.email && (
          <Text style={{ color: colors.danger, fontSize: 12, marginTop: -12, marginBottom: 8 }}>
            {errors.email}
          </Text>
        )}

        <TextInput
          placeholder="Contraseña"
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          secureTextEntry
          autoComplete="password"
        />
        {errors.password && (
          <Text style={{ color: colors.danger, fontSize: 12, marginTop: -12, marginBottom: 8 }}>
            {errors.password}
          </Text>
        )}

        <Button
          text="¿Olvidaste tu contraseña?"
          onPress={() => setShowForgotPassword(!showForgotPassword)}
          style={{ 
            backgroundColor: 'transparent', 
            elevation: 0,
            shadowOpacity: 0,
            marginBottom: 8 
          }}
          textStyle={{ color: colors.primary, fontSize: 14 }}
          disabled={isLoading}
        />

        {showForgotPassword && (
          <View style={{ 
            backgroundColor: colors.secondary + '20', 
            padding: 16, 
            borderRadius: 8, 
            marginBottom: 16 
          }}>
            <Text style={{ color: colors.textSecondary, marginBottom: 8 }}>
              Ingresa tu email y te enviaremos instrucciones para recuperar tu contraseña.
            </Text>
            <Button
              text="Enviar Email de Recuperación"
              onPress={handleForgotPassword}
              style={{ backgroundColor: colors.warning }}
              disabled={isLoading}
            />
          </View>
        )}

        <Button
          text={isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          onPress={handleLogin}
          style={{ marginTop: 16 }}
          disabled={isLoading || Object.keys(errors).length > 0}
        />

        {isLoading && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={{ color: colors.textSecondary, marginLeft: 8 }}>
              Verificando credenciales...
            </Text>
          </View>
        )}

        <Button
          text="¿No tienes cuenta? Regístrate"
          onPress={() => router.push('/(auth)/register')}
          style={{ backgroundColor: colors.secondary, marginTop: 16 }}
          disabled={isLoading}
        />

        <View style={{ marginTop: 32, alignItems: 'center' }}>
          <Text style={{ color: colors.textSecondary, fontSize: 12, textAlign: 'center' }}>
            Al iniciar sesión aceptas nuestros términos y condiciones
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
