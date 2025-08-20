
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#007748', // FIFA 2026 Verde oficial
  secondary: '#FFD700', // Dorado FIFA
  accent: '#FF6B00', // Naranja vibrante
  blue: '#003DA5', // Azul FIFA
  red: '#D50000', // Rojo FIFA
  background: '#F4F5F7',
  backgroundDark: '#1a1a1a',
  text: '#333333',
  textLight: '#FFFFFF',
  textSecondary: '#666666', // Color para texto secundario
  white: '#FFFFFF',
  gray: '#8E8E93',
  success: '#00A651',
  warning: '#FFC72C',
  danger: '#FF3B30',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  containerDark: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  titleLight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
  },
  subtitleLight: {
    fontSize: 18,
    color: colors.textLight,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  textLight: {
    fontSize: 16,
    color: colors.textLight,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shadowStrong: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fifaGradient: {
    backgroundColor: colors.primary,
  },
  goldGradient: {
    backgroundColor: colors.secondary,
  }
});

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  buttonAccent: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: colors.backgroundDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
