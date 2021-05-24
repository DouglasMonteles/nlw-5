import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';

import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

import PlantProps from './src/models/PlantProps';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    // recurso para escutar as notificações e obter o seu payload
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      },
    );

    return () => subscription.remove();


    // async function notifications() {
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log('NOTIFICACOES AGENDADAS:\n' + data);
    // }

    // notifications();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});