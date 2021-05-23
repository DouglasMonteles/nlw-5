import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../styles/colors';

import { PlantSelect } from '../pages/plant-select';
import { MyPlants } from '../pages/my-plants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          height: 80,
        }
      }}
    >
      <AppTab.Screen 
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons 
              name="add-circle-outline"
              size={size}
              color={color}
            />
          )
        }}
      />

      <AppTab.Screen 
        name="Minhas Planta"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons 
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />
    </AppTab.Navigator>
  );
};

export default AuthRoutes;