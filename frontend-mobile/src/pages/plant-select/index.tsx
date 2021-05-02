import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import styles from './styles';

import { Header } from '../../components/header';
import { EnviromentButton } from '../../components/enviroment-button';
import EnvironmentProps from '../../models/EnvironmentProps';
import api from '../../services/api';

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get<EnvironmentProps[]>('plants_environments');
      setEnvironments([
        { 
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    fetchEnviroment();
  }, []);

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

      <View>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          data={environments}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
            />
          )}
        />
      </View>
    </View>
  );
}