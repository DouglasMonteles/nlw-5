import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import styles from './styles';
import WaterDropImg from '../../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import PlantProps from '../../models/PlantProps';
import { loadPlants } from '../../models/StoragePlantProps';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Header } from '../../components/header';
import { PlantCardSecundary } from '../../components/plant-card-secundary';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      // calcula a distância de uma data para outra
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getDate(),
        {
          locale: pt,
        }
      );      

      setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`);
      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={WaterDropImg}
          style={styles.spotlightImage}
        />

        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item: PlantProps) => String(item.id)}
          renderItem={({ item }) => {
            return (
              <PlantCardSecundary
                data={item}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}