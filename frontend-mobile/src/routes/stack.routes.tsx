import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import { Welcome } from '../pages/welcome';
import { UserIdentification } from '../pages/user-identification';
import { Confirmation } from '../pages/confirmation';
import { PlantSave } from '../pages/plant-save';
import { MyPlants } from '../pages/my-plants';
import AuthRoutes from './tabs.route';

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
      component={AuthRoutes}
    />

    <StackRoutes.Screen 
      name="PlantSave"
      component={PlantSave}
    />

    <StackRoutes.Screen
      name="MyPlant"
      component={AuthRoutes}
    />
  </StackRoutes.Navigator>
);

export default AppRoutes;