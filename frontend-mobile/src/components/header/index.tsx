import React, { useEffect, useState } from 'react';
import { 
  Image,
  Text, 
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../../assets/user.jpeg';
import styles from './styles';

export function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    getUsername();
  }, []);

  async function getUsername() {
    const name = await AsyncStorage.getItem('@plantmanager:username');
    setUsername(name || '');
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{username}</Text>
      </View>

      <Image source={userImg} style={styles.image} />
    </View>
  );
}