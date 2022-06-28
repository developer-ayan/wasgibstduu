import React, {useContext, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ads from '../../screens/ads/Ads';

import Octicons from 'react-native-vector-icons/Octicons';
import Login from '../../screens/Login/Login';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import GuestCustomDrawer from '../GuestCustomDrawer/GuestCustomDrawer';
import GuestHome from '../GuestScreens/GuestHome';
import GuestProfile from '../GuestScreens/GuestProfile';
import GuestInbox from '../GuestScreens/GuestInbox';
import GuestAds from '../GuestScreens/GuestAds';

const drawer = createDrawerNavigator();

function GuestDrawer() {
  return (
    <drawer.Navigator
    
      drawerContent={props => <GuestCustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      
        drawerActiveBackgroundColor: '#00aa49',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: 'black',
        drawerLabelStyle: {
          marginLeft: -10,
          fontFamily: 'JosefinSans-Regular',
          fontSize: 15,
        },
      }}>
      <drawer.Screen
        name="Home"
        component={GuestHome}
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="home" color={color} size={25} />
          ),
        }}
      />
      <drawer.Screen
        name="Ads"
        component={GuestAds}
        options={{
          drawerIcon: ({color}) => (
            <SimpleLineIcons name="camera" color={color} size={25} />
          ),
        }}
      />
      <drawer.Screen
        name="Profile"
        component={GuestProfile}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="user" color={color} size={25} />
          ),
        }}
      />
      <drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="login" color={color} size={25} />
          ),
          headerShown : false
        }}
      />
      <drawer.Screen
        name="Inbox"
        component={GuestInbox}
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="home" color={color} size={25} />
          ),
        }}
      />
    </drawer.Navigator>
  );
}

export default GuestDrawer;
