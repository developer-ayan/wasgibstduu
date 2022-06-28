import React, {useContext, useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import manageAds from '../../screens/ManageAds/ManageAds';
import PremiumAddsManage from '../../screens/PremiumAddsManage.js/PremiumAddsManage';
import Ads from '../../screens/ads/Ads';
import Inbox from '../../screens/Inbox/Inbox';
import Home from '../../screens/Home/Home';
import Drawer from '../Drawer/Drawer';
import Profile from '../../screens/Profile/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {AuthContext} from '../../context/Auth';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';

export default function BottomNav() {
  // const state = useSelector(state => state.user);
  const {messageCounting} = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const {user} = useContext(AuthContext)


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

      firestore()
      .collection('Inbox')
      .onSnapshot(documentSnapshop => {
        console.log(
          documentSnapshop.docs
            .map(e => e.data())
            .filter(function (item) {
              return (
                item.user1.uid === user?.USER_ID ||
                item.user2.uid === user?.USER_ID
              );
            }),
            setLoading(false)
        );
      });
  }, []);
  const Tab = createMaterialBottomTabNavigator();
  return loading ? (
    <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  ) : (
    <Tab.Navigator
      initialRouteName="Drawer"
      activeColor="black"
      barStyle={{backgroundColor: '#ffffff'}}>
      <Tab.Screen
        name="Drawer"
        component={Drawer}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <Octicons name="home" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="manageAds"
        component={manageAds}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <AntDesign name="staro" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Ads"
        component={Ads}
        options={{
          tabBarLabel: <Entypo name="dot-single" size={15} />,
          tabBarIcon: ({color}) => (
            <AntDesign name="plussquareo" color={color} size={23} />
          ),
        }}
      />
      {messageCounting === 0 ? (
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
      )}
      <Tab.Screen
        name="Profile"
        component={Profile}
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
