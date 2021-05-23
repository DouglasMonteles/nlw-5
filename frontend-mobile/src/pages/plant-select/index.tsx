import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import styles from './styles';
import api from '../../services/api';
import EnvironmentProps from '../../models/EnvironmentProps';
import PlantProps from '../../models/PlantProps';

import { Header } from '../../components/header';
import { EnviromentButton } from '../../components/enviroment-button';
import { PlantCardPrimary } from '../../components/plant-card-primary';
import { Load } from '../../components/load';
import colors from '../../styles/colors';

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

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
    fetchPlants();
  }, []);

  async function fetchPlants() {
    const { data } = await api
      .get<PlantProps[]>(`plants?_sort=name&_order=asc&_page=${page}&_limit=6`);
      
    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment == 'all') {
      return setFilteredPlants(plants);
    } 

    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    );
    
    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  if (loading) {
    return <Load />;
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
          keyExtractor={(item) => String(item.key)}
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
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            onEndReachedThreshold={0.15} // Porcentagem final da tela que inicia o fetch
            onEndReached={({ distanceFromEnd }) => 
                handleFetchMore(distanceFromEnd)}
            data={filteredPlants}
            renderItem={({ item }) => (
              <PlantCardPrimary
                key={item.id}
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            )}
            ListFooterComponent={
              <>
                {
                  loadingMore &&
                  <ActivityIndicator 
                    color={colors.green}
                  />
                }
              </> 
            }
          />
      </View>
    </View>
  );
}