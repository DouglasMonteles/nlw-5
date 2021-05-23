import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
} from 'react-native';
import { Button } from '../../components/button';

import styles from './styles';

export interface ConfirmationProps {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  smile: '😄',
  hug: '🤗',
};

export function Confirmation() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = route.params as ConfirmationProps;

  function handleMoveOn(): void {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button 
            title={buttonTitle}
            onPress={handleMoveOn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}