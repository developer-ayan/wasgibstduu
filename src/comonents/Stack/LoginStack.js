import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Auth Screen

import Login from '../../screens/Login/Login';

// Display Screens

import SignUp from '../../screens/SignUp/SignUp';
import GuestNav from '../../guest/Bottom/GuestNav';
// import Guest_Auto_Mobiles from '../../guest/Guest_Category/Guest_Auto_Mobiles'
import Guest_Auto_Mobiles from '../../guest/Guest_Category/Guest_Auto_mobiles/Guest_Auto_mobiles';
import GuestFilterData from '../../guest/GuestScreens/GuestFilterData';
import GuestSearchBar from '../../guest/GuestScreens/GuestSearchBar';
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
        name="GuestNav"
        component={GuestNav}
        options={{animation: 'slide_from_right'}}
      />
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

      <Stack.Screen
        name="Guest_Auto_Mobiles"
        component={Guest_Auto_Mobiles}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="GuestFilterData"
        component={GuestFilterData}
        options={{animation: 'slide_from_right'}}
      />

<Stack.Screen
        name="GuestSearchBar"
        component={GuestSearchBar}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}
export default LoginStack;
