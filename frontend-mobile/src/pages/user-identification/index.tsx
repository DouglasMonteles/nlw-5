import React, { useState } from 'react';
import { 
  SafeAreaView,
  Text,
  TextInput,
  View, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/button';
import { ConfirmationProps } from '../confirmation';

import colors from '../../styles/colors';
import styles from './styles';

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const navigation = useNavigation();

  function handleInputBlur(): void {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function handleInputChange(value: string): void {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name) {
      return Alert.alert('Por favor, \nMe informe seu nome 😢');
    }
    
    await AsyncStorage.setItem('@plantmanager:username', name);
    navigation.navigate('Confirmation', {
      title: 'Prontinho',
      subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
      buttonTitle: 'Começar',
      icon: 'smile',
      nextScreen: 'PlantSelect',
    } as ConfirmationProps);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? '😁' : '🙂'}
                </Text>

                <Text style={styles.title}>
                  Como podemos {'\n'} 
                  chamar você?
                </Text>
              </View>

              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderBottomColor: colors.green }
                ]}
                placeholder="Escreva seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              
              <View style={styles.footer}>
                <Button 
                  title="Confirmar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}