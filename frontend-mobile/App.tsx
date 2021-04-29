import React from 'react';
import { StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

import { Welcome } from './src/pages/welcome';
import { UserIdentification } from './src/pages/user-identification';
import { Confirmation } from './src/pages/confirmation';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Confirmation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});