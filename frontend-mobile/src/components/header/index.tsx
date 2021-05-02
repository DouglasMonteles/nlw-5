import React from 'react';
import { 
  Image,
  Text, 
  View,
} from 'react-native';

import userImg from '../../assets/user.jpeg';
import styles from './styles';

export function Header() {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Douglas</Text>
      </View>

      <Image source={userImg} style={styles.image} />
    </View>
  );
}