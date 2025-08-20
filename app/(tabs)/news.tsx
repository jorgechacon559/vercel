
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';

const newsItems = [
  {
    id: '1',
    title: '¡Mascota Oficial de 2026 Revelada!',
    summary: 'Un personaje vibrante y enérgico que representa el espíritu de Norteamérica ha sido revelado como la mascota oficial.',
    image: 'https://images.unsplash.com/photo-1553773037-639411b23a7a?q=80&w=2070',
  },
  {
    id: '2',
    title: 'Información de Venta de Boletos Publicada',
    summary: 'FIFA ha anunciado las fases para la venta de boletos. Los fanáticos ya pueden registrar su interés para ser los primeros en saber.',
    image: 'https://images.unsplash.com/photo-1599421497823-739807a5a934?q=80&w=2070',
  },
  {
    id: '3',
    title: 'Renovaciones de Estadios Cerca de Completarse',
    summary: 'Los estadios sede están recibiendo importantes mejoras para proporcionar una experiencia de vanguardia para los fanáticos.',
    image: 'https://images.unsplash.com/photo-1580447341588-375982a32781?q=80&w=2070',
  },
  {
    id: '4',
    title: 'Eliminatorias Sudamericanas en Curso',
    summary: 'Los equipos de CONMEBOL luchan por asegurar su lugar en el Mundial 2026. Sigue los resultados más recientes.',
    image: 'https://images.unsplash.com/photo-1606924842584-dd4eba9f3a55?q=80&w=2070',
  },
  {
    id: '5',
    title: 'Nueva Tecnología VAR para 2026',
    summary: 'FIFA implementará la tecnología VAR más avanzada para garantizar decisiones justas y precisas.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070',
  },
];

export default function NewsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Noticias y Artículos</Text>
        <Text style={styles.subtitle}>Mantente al día con las últimas novedades del Mundial FIFA 2026</Text>
        {newsItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.summary}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
  },
  title: {
    ...commonStyles.title,
    textAlign: 'center',
    marginBottom: 8,
    color: colors.primary,
  },
  subtitle: {
    ...commonStyles.subtitle,
    textAlign: 'center',
    marginBottom: 24,
    color: colors.text,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    ...commonStyles.shadowStrong,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  cardText: {
    ...commonStyles.text,
    lineHeight: 22,
  },
});
