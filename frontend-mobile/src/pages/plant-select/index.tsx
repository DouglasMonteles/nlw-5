import React from 'react';
import { 
  View,
  Text,
} from 'react-native';

import styles from './styles';

import { Header } from '../../components/header';
import { EnviromentButton } from '../../components/enviroment-button';

export function PlantSelect() {
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>

        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <EnviromentButton
        title="Cozinha"
        active
      />
    </View>
  );
}