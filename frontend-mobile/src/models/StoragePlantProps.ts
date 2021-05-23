import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import PlantProps from "./PlantProps";

export interface StoragePlantProps {
  [id: number]: {
    data: PlantProps;
  }
}

export async function savePlantInStorage(plant: PlantProps): Promise<void> {
  try {
    

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id] : {
        data: plant,
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
  
  delete plants[id];

  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
}