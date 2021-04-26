import React from 'react';
import { 
  Image, 
  SafeAreaView, 
  Text, 
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import wateringImg from '../../assets/watering.png';

export function Welcome() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>

      <Image 
        source={wateringImg} 
        style={styles.image} 
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. 
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
} 