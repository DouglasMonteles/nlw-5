import React, { useState } from 'react';
import { 
  SafeAreaView,
  Text,
  TextInput,
  View, 
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/button';

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

  function handleSubmit(): void {
    navigation.navigate('Confirmation');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}