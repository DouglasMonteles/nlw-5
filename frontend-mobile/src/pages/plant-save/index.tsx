import React, { useState } from 'react';
import { 
  View, 
  Text,
  Alert,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import waterDropImg from '../../assets/waterdrop.png';
import styles from './styles';

import { Button } from '../../components/button';
import PlantProps from '../../models/PlantProps';
import { ConfirmationProps } from '../confirmation';
import { loadPlants, savePlantInStorage } from '../../models/StoragePlantProps';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const route = useRoute();
  const navigation = useNavigation();
  const { plant } = route.params as Params;

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma data no futuro! ⏱️');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlantInStorage({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlant',
      } as ConfirmationProps);
    } catch {
      Alert.alert('Não foi possível salvar.');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            width={150}
            height={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>

          <Text style={styles.plantAbout}>
            {plant.about}  
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image 
              source={waterDropImg}
              style={styles.tipImage}
            />

            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {
            showDatePicker && (
            <DateTimePicker 
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />)
          }

          {
            Platform.OS === 'android' && (
              <TouchableOpacity 
                onPress={handleOpenDateTimePickerForAndroid}
                style={styles.dateTimePickerButton}
              >
                <Text style={styles.dateTimePickerText}>
                  {`Mudar Horário ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button 
            title="Cadastrar planta"
            onPress={handleSavePlant}
          />
        </View>
      </View>
    </ScrollView>
  );
}