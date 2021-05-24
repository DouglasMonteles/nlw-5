import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import * as Notifications from 'expo-notifications';
import PlantProps from "./PlantProps";

export interface StoragePlantProps {
  [id: number]: {
    data: PlantProps;
    notificationId: string;
  }
}

export async function savePlantInStorage(plant: PlantProps): Promise<void> {
  try {
    const nexTime = new Date(plant.dateTimeNotification);
    const now = new Date();
    const { times, repeat_every } = plant.frequency;

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nexTime.setDate(now.getDate() + interval);
    } else { // caso seja todo dia
      nexTime.setDate(nexTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nexTime.getTime()) / 1000)
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },

      trigger: {
        seconds: (seconds < 60) ? 60 : seconds,
        repeats: true,
      }
    });

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id] : {
        data: plant,
        notificationId,
      },
    };

    await AsyncStorage.setItem('@plantmanager:plants', 
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      }));
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object
      .keys(plants)             // Para cada chave existente em 'plants'
      .map((plant) => {
        return {
          ...plants[Number(plant)].data,
          hour: format(new Date(plants[Number(plant)].data.dateTimeNotification), 'HH:mm'),
        };
      })
      .sort((a, b) => {
        return Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        );
      });

    return plantsSorted;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlant(id: number): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
  
  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);

  delete plants[id];

  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
}