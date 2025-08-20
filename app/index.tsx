
import { Redirect } from 'expo-router';

export default function App() {
  // For now, we'll assume the user is not logged in.
  // Later, we'll add logic to check for an existing session.
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
