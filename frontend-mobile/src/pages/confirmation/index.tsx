import React from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
} from 'react-native';
import { Button } from '../../components/button';

import styles from './styles';

export function Confirmation() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😁
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.subtitle}>
          Vamos começar a cuidar das suas 
          plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button />
        </View>
      </View>
    </SafeAreaView>
  );
}