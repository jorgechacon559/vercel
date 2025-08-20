import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import { DevServerUtils } from '../../utils/DevServerUtils';

const { width, height } = Dimensions.get('window');

export default function GameWebViewScreen() {
  const { file } = useLocalSearchParams<{ file: string }>();
  const router = useRouter();

  if (!file) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="warning-outline" size={64} color={colors.primary} />
          <Text style={styles.errorText}>Error: No se especificó el archivo del juego</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Construir la URL según la plataforma
  const getGameUrl = () => {
    if (Platform.OS === 'web') {
      // En web, usar ruta relativa
      return `/${file}`;
    } else {
      // En móvil, intentar diferentes estrategias
      if (file) {
        // Primero intentar con el servidor de desarrollo
        try {
          const devUrl = DevServerUtils.getFileUrl(file as string);
          console.log('Intentando cargar juego desde:', devUrl);
          return devUrl;
        } catch (error) {
          console.log('Error con DevServerUtils, usando fallback');
          // Fallback: usar localhost
          return `http://localhost:8081/${file}`;
        }
      }
      return '';
    }
  };

  const gameUrl = getGameUrl();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.white} />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>Juego FIFA 2026</Text>
      </View>
      
      <WebView
        source={{ uri: gameUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('Error en WebView:', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('HTTP Error en WebView:', nativeEvent);
        }}
        onLoad={() => {
          console.log('Juego cargado exitosamente:', gameUrl);
        }}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando juego...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primary,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    ...commonStyles.titleLight,
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    ...commonStyles.text,
    textAlign: 'center',
    marginBottom: 24,
    color: colors.danger,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
  },
  loadingText: {
    ...commonStyles.textLight,
    fontSize: 18,
  },
});
