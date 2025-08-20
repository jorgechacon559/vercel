
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, Alert, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { commonStyles, colors } from '@/styles/commonStyles';
import { ProductionAuthService, ValidationUtils } from '@/services/ProductionAuthService';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  // Validar campo específico
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'El nombre es requerido';
        } else if (value.trim().length < 2) {
          newErrors.fullName = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete newErrors.fullName;
        }
        break;

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
        const passwordValidation = ValidationUtils.isValidPassword(value);
        if (!passwordValidation.valid) {
          newErrors.password = passwordValidation.message;
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!ValidationUtils.passwordsMatch(formData.password, value)) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
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

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const fields = ['fullName', 'email', 'password', 'confirmPassword'];
    let hasErrors = false;

    fields.forEach(field => {
      validateField(field, formData[field as keyof typeof formData]);
    });

    hasErrors = Object.keys(errors).length > 0;

    // Validaciones adicionales
    if (!formData.fullName.trim()) hasErrors = true;
    if (!formData.email.trim()) hasErrors = true;
    if (!formData.password) hasErrors = true;
    if (!ValidationUtils.passwordsMatch(formData.password, formData.confirmPassword)) hasErrors = true;

    return !hasErrors;
  };

  // Manejar registro
  const handleRegister = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    setIsLoading(true);

    try {
      const result = await ProductionAuthService.signUp(
        formData.email,
        formData.password,
        formData.fullName
      );

      if (result.success) {
        if (result.needsEmailConfirmation) {
          setShowEmailConfirmation(true);
          Alert.alert(
            '📧 Confirma tu Email',
            `Hemos enviado un email de confirmación a ${formData.email}. Por favor revisa tu bandeja de entrada y spam.`,
            [{ text: 'Entendido' }]
          );
        } else {
          Alert.alert(
            '✅ Cuenta Creada',
            '¡Bienvenido al Mundial 2026! Tu cuenta ha sido creada exitosamente.',
            [
              {
                text: 'Continuar',
                onPress: () => router.replace('/(tabs)/home')
              }
            ]
          );
        }
      } else {
        Alert.alert('Error', result.error || 'No se pudo crear la cuenta');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      Alert.alert('Error', 'Ha ocurrido un error inesperado. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reenviar confirmación de email
  const handleResendConfirmation = async () => {
    setIsLoading(true);
    
    const result = await ProductionAuthService.resendEmailConfirmation(formData.email);
    
    if (result.success) {
      Alert.alert('📧 Email Reenviado', 'Hemos reenviado el email de confirmación');
    } else {
      Alert.alert('Error', result.error || 'No se pudo reenviar el email');
    }
    
    setIsLoading(false);
  };

  // Pantalla de confirmación de email
  if (showEmailConfirmation) {
    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <ScrollView>
          <Text style={[commonStyles.title, { color: colors.text, textAlign: 'center' }]}>
            📧 Confirma tu Email
          </Text>
          
          <View style={{ alignItems: 'center', marginVertical: 32 }}>
            <Text style={[commonStyles.subtitle, { color: colors.textSecondary, textAlign: 'center' }]}>
              Hemos enviado un email de confirmación a:
            </Text>
            <Text style={[commonStyles.subtitle, { color: colors.primary, fontWeight: 'bold', marginTop: 8 }]}>
              {formData.email}
            </Text>
            <Text style={[commonStyles.subtitle, { color: colors.textSecondary, textAlign: 'center', marginTop: 16 }]}>
              Por favor revisa tu bandeja de entrada y spam, luego haz clic en el enlace de confirmación.
            </Text>
          </View>

          <Button
            text="Reenviar Email"
            onPress={handleResendConfirmation}
            style={{ backgroundColor: colors.secondary, marginBottom: 16 }}
            disabled={isLoading}
          />

          <Button
            text="Ir a Iniciar Sesión"
            onPress={() => router.replace('/(auth)/login')}
            style={{ marginBottom: 16 }}
          />

          <Button
            text="Volver al Registro"
            onPress={() => setShowEmailConfirmation(false)}
            style={{ backgroundColor: colors.secondary }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <Text style={[commonStyles.title, { color: colors.text }]}>
          🏆 Crear Cuenta
        </Text>
        <Text style={[commonStyles.subtitle, { color: colors.textSecondary }]}>
          Únete a la comunidad del Mundial 2026
        </Text>

        <TextInput
          placeholder="Nombre Completo"
          value={formData.fullName}
          onChangeText={(value) => updateFormData('fullName', value)}
          autoCapitalize="words"
        />
        {errors.fullName && (
          <Text style={{ color: colors.danger, fontSize: 12, marginTop: -12, marginBottom: 8 }}>
            {errors.fullName}
          </Text>
        )}

        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
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
        />
        {errors.password && (
          <Text style={{ color: colors.danger, fontSize: 12, marginTop: -12, marginBottom: 8 }}>
            {errors.password}
          </Text>
        )}

        <TextInput
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
          secureTextEntry
        />
        {errors.confirmPassword && (
          <Text style={{ color: colors.danger, fontSize: 12, marginTop: -12, marginBottom: 8 }}>
            {errors.confirmPassword}
          </Text>
        )}

        <Text style={[commonStyles.subtitle, { 
          color: colors.textSecondary, 
          fontSize: 12, 
          marginVertical: 8 
        }]}>
          Al crear una cuenta aceptas nuestros términos y condiciones
        </Text>

        <Button
          text={isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
          onPress={handleRegister}
          style={{ marginTop: 16 }}
          disabled={isLoading || Object.keys(errors).length > 0}
        />

        {isLoading && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={{ color: colors.textSecondary, marginLeft: 8 }}>
              Procesando registro...
            </Text>
          </View>
        )}

        <Button
          text="¿Ya tienes cuenta? Inicia Sesión"
          onPress={() => router.push('/(auth)/login')}
          style={{ backgroundColor: colors.secondary, marginTop: 12 }}
          disabled={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}