import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';

import Button from '@/components/Button';
import { commonStyles, colors } from '@/styles/commonStyles';
import { ProductionAuthService, AuthUser } from '@/services/ProductionAuthService';

export default function VerifyEmailScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const result = await ProductionAuthService.getCurrentSession();
      if (result.success && result.user) {
        setUser(result.user);
        // Si ya está confirmado, ir a home
        if (result.user.email_confirmed_at) {
          router.replace('/(tabs)/home');
        }
      } else {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      router.replace('/(auth)/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!user?.email) return;
    
    setResending(true);
    const result = await ProductionAuthService.resendEmailConfirmation(user.email);
    setResending(false);
    
    if (result.success) {
      Alert.alert('✅ Email Enviado', 'Hemos reenviado el email de confirmación. Revisa tu bandeja de entrada y spam.');
    } else {
      Alert.alert('❌ Error', result.error || 'Error al reenviar email');
    }
  };

  const handleSignOut = async () => {
    await ProductionAuthService.signOut();
    router.replace('/(auth)/login');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textSecondary, marginTop: 16 }}>
          Verificando autenticación...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', minHeight: '80%' }}>
        <View style={{ alignItems: 'center', padding: 32 }}>
          <Text style={{ fontSize: 64, marginBottom: 16 }}>📧</Text>
          
          <Text style={[commonStyles.title, { color: colors.text, textAlign: 'center' }]}>
            Confirma tu Email
          </Text>
          
          <Text style={[commonStyles.subtitle, { color: colors.textSecondary, textAlign: 'center', marginTop: 16, marginBottom: 16 }]}>
            Hemos enviado un email de confirmación a:
          </Text>
          
          <Text style={[commonStyles.subtitle, { color: colors.primary, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 }]}>
            {user?.email}
          </Text>
          
          <Text style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 32, fontSize: 14 }}>
            Por favor haz clic en el enlace del email para activar tu cuenta y continuar.
          </Text>

          <Button
            text={resending ? 'Enviando...' : 'Reenviar Email de Confirmación'}
            onPress={handleResendConfirmation}
            style={{ backgroundColor: colors.secondary, marginBottom: 16, width: '100%' }}
            disabled={resending}
          />

          <Button
            text="Usar Diferente Email"
            onPress={handleSignOut}
            style={{ backgroundColor: colors.gray, width: '100%' }}
            disabled={resending}
          />
          
          <Text style={{ color: colors.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 24 }}>
            Si no ves el email, revisa tu carpeta de spam.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
