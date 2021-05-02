import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import styles from './styles';
import api from '../../services/api';
import EnvironmentProps from '../../models/EnvironmentProps';
import PlantProps from '../../models/PlantProps';

import { Header } from '../../components/header';
import { EnviromentButton } from '../../components/enviroment-button';
import { PlantCardPrimary } from '../../components/plant-card-primary';

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
  const [environmentSelected, setEnvironmentSelected] = useState('all');

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api
        .get<EnvironmentProps[]>('plants_environments?_sort=title&_order=asc');

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

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api
        .get<PlantProps[]>('plants?_sort=name&_order=esc');
      setPlants(data);
    }

    fetchPlants();
  }, []);

  function handleEnvironmentSelected(environment: string): void {
    setEnvironmentSelected(environment);

    if (environment === 'all') {
      return setFilteredPlants(plants);
    } 

    const filtered = plants
      .filter(plant => plant.environments.includes(environment));
    
    setFilteredPlants(filtered);
  }

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
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
          <FlatList 
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            data={filteredPlants}
            renderItem={({ item }) => (
              <PlantCardPrimary
                key={item.id}
                data={item}
              />
            )}
          />
      </View>
    </View>
  );
}