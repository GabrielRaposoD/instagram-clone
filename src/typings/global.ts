import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface User {
  email: string;
  name: string;
  password: string;
  id: string;
}

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  Login: undefined;
  Register: undefined;
  Search: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
