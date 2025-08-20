
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>¡Bienvenido al Portal FIFA Mundial 2026!</Text>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1606924842584-dd4eba9f3a55?q=80&w=2070' }} style={styles.headerImage} />
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Últimas Noticias</Text>
          {/* Placeholder para noticias */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>¡Comienzan las Eliminatorias!</Text>
            <Text style={styles.cardText}>El camino hacia 2026 ha comenzado oficialmente. Descubre qué equipos están jugando...</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ciudades Sede Anunciadas</Text>
            <Text style={styles.cardText}>Descubre las vibrantes ciudades de Norteamérica que albergarán los partidos.</Text>
          </View>

          <Text style={styles.sectionTitle}>Juegos Destacados</Text>
           {/* Placeholder para enlaces de juegos */}
           <View style={styles.card}>
            <Text style={styles.cardTitle}>Quiniela Mundial</Text>
            <Text style={styles.cardText}>¡Prueba tu suerte y gana grandes premios en nuestra quiniela del Mundial!</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Memorama FIFA</Text>
            <Text style={styles.cardText}>Pon a prueba tu memoria con iconos del fútbol mundial.</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Juego Arcade</Text>
            <Text style={styles.cardText}>Disfruta de nuestro emocionante juego arcade con temática futbolística.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    ...commonStyles.title,
    textAlign: 'center',
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    ...commonStyles.title,
    fontSize: 22,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...commonStyles.shadow,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  cardText: {
    ...commonStyles.text,
  },
});
