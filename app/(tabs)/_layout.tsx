
import { Tabs } from 'expo-router';
import { colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Juegos',
          tabBarIcon: ({ color, size }) => <Icon name="game-controller" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'Noticias',
          tabBarIcon: ({ color, size }) => <Icon name="newspaper" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
