import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import { Welcome } from '../pages/welcome';
import { UserIdentification } from '../pages/user-identification';
import { Confirmation } from '../pages/confirmation';
import { PlantSelect } from '../pages/plant-select';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      }
    }}
  >
    <StackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />

    <StackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />

    <StackRoutes.Screen 
      name="Confirmation"
      component={Confirmation}
    />

    <StackRoutes.Screen 
      name="PlantSelect"
      component={PlantSelect}
    />
  </StackRoutes.Navigator>
);

export default AppRoutes;