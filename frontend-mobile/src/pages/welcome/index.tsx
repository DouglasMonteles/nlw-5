import React, { useState } from 'react';
import { Image, SafeAreaView, Text } from 'react-native';

import styles from './styles';

import wateringImg from '../../assets/watering.png';
import { Button } from '../../components/button';

export function Welcome() {
  const [visible, setVisible] = useState<boolean>(false);

  function handleVisibility(): void {
    setVisible(!visible);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>

      {
        visible &&
        <Image source={wateringImg} style={styles.image} />
      }

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. 
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <Button
        title={'>'}
        onPress={handleVisibility}
      />
    </SafeAreaView>
  );
} 