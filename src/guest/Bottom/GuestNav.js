import React, {useContext, useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
// import manageAds from '../../screens/ManageAds/ManageAds';
// import PremiumAddsManage from '../../screens/PremiumAddsManage.js/PremiumAddsManage';
// import Ads from '../../screens/Ads/Ads';
// import Inbox from '../../screens/Inbox/Inbox';
// import Home from '../../screens/Home/Home';
// import Profile from '../../screens/Profile/Profile';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useSelector} from 'react-redux';
import {AuthContext} from '../../context/Auth';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
import GuestHome from '../GuestScreens/GuestHome';
import GuestAds from '../GuestScreens/GuestAds';
import GuestStared from '../GuestScreens/GuestStared';
import GuestInbox from '../GuestScreens/GuestInbox';
import GuestProfile from '../GuestScreens/GuestProfile';
import GuestDrawer from '../GuestDrawer/GuestDrawer';

export default function GuestNav() {
  // const state = useSelector(state => state.user);
  const {messageCounting} = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    firestore()
      .collection('Category')
      .get()
      .then(correct => {
        correct.forEach(snapshot => {
          firestore().collection('Category').doc(snapshot.id).update({
            AUTO_ID: snapshot.id,
          });
        });
      });
  }, []);
  const Tab = createMaterialBottomTabNavigator();
  return !loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <Tab.Navigator
      initialRouteName="GuestDrawer"
      activeColor="black"
      barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="GuestDrawer"
        component={GuestDrawer}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <Octicons name="home" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="GuestStared"
        component={GuestStared}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <AntDesign name="staro" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Ads"
        component={GuestAds}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <AntDesign name="plussquareo" color={color} size={23} />
          ),
        }}
      />

      <Tab.Screen
        name="GuestInbox"
        component={GuestInbox}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <Fontisto name="email" color={color} size={23} />
          ),
        }}
      />
      {/* {messageCounting === 0 ? (
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            tabBarLabel: <Entypo name="dot-single" size={15} />,
            tabBarIcon: ({color}) => (
              <Fontisto name="email" color={color} size={23} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            tabBarBadge: messageCounting,
            tabBarLabel: <Entypo name="dot-single" size={15} />,
            tabBarIcon: ({color}) => (
              <Fontisto name="email" color={color} size={23} />
            ),
          }}
        />
      )} */}
      <Tab.Screen
        name="GuestProfile"
        component={GuestProfile}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <AntDesign name="user" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
