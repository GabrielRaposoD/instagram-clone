import {
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  SearchScreen,
} from 'screens';
import { QueryClient, QueryClientProvider } from 'react-query';
import { auth, firebase } from 'services';
import { useEffect, useState } from 'react';

import { CurrentUserProvider } from 'contexts';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from 'typings/global';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [queryClient] = useState(() => new QueryClient());

  const onAuthStateChanged = (user: firebase.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            options={{ headerShown: false }}
            name='Login'
            component={LoginScreen}
          />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentUserProvider userId={user.uid}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen
              name='Profile'
              component={ProfileScreen}
              initialParams={{ userId: user.uid }}
            />
            <Stack.Screen name='Search' component={SearchScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentUserProvider>
    </QueryClientProvider>
  );
};

export default App;
