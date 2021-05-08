import React from 'react';

import {
  View,
} from 'react-native';

import LottieView from 'lottie-react-native';

import styles from './styles';
import loadAnimation from '../../assets/load.json';

export function Load() {

  return (
    <View style={styles.container}>
      <LottieView 
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}