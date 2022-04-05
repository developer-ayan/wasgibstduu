import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Auth Screen

import Login from '../../screens/Login/Login';

// Display Screens

import SignUp from '../../screens/SignUp/SignUp';

// Category

const Stack = createStackNavigator();
function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}
export default LoginStack;
