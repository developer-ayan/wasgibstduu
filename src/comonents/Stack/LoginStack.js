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
import Guest_Categories_detail from '../../guest/Guest_Category/Guest_Categories_detail/Guest_Categories_detail';
import Guest_Electronics from '../../guest/Guest_Category/Guest_Electronics/Guest_Electronics';
import Guest_Events from '../../guest/Guest_Category/Guest_Events/Guest_Events';
import Guest_Fashion from '../../guest/Guest_Category/Guest_Fashion/Guest_Fashion';
import Guest_Jobs from '../../guest/Guest_Category/Guest_Jobs/Guest_Jobs';
import Guest_Learning from '../../guest/Guest_Category/Guest_Learning/Guest_Learning';
import Guest_Phone_and_Elec from '../../guest/Guest_Category/Guest_Phone_&_Elec/Guest_Phone_&_Elec';
import Guest_Real_States from '../../guest/Guest_Category/Guest_Real_States/Guest_Real_States';
import Guest_Services from '../../guest/Guest_Category/Guest_Services/Guest_Services';
import GuestDrawer from '../../guest/GuestDrawer/GuestDrawer';
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
        name="drawer"
        component={GuestDrawer}
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

      <Stack.Screen
        name="Guest_Categories_detail"
        component={Guest_Categories_detail}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Electronics"
        component={Guest_Electronics}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Events"
        component={Guest_Events}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Fashion"
        component={Guest_Fashion}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Jobs"
        component={Guest_Jobs}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Learning"
        component={Guest_Learning}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Phone_and_Elec"
        component={Guest_Phone_and_Elec}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Real_States"
        component={Guest_Real_States}
        options={{animation: 'slide_from_right'}}
      />

      <Stack.Screen
        name="Guest_Services"
        component={Guest_Services}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}
export default LoginStack;
