import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import manageAds from '../../screens/ManageAds/ManageAds';
import PremiumAddsManage from '../../screens/PremiumAddsManage.js/PremiumAddsManage';
import Ads from '../../screens/Ads/Ads';
import Inbox from '../../screens/Inbox/Inbox';
import Home from '../../screens/Home/Home';
import Drawer from '../Drawer/Drawer';
import Profile from '../../screens/Profile/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export default function BottomNav() {

    const state = useSelector(state => state.user)
    React.useEffect(() => {
        try {
            const userDetail = JSON.stringify(state)
            AsyncStorage.setItem('userData', userDetail)
        } catch (e) {
            // saving error
        }
    }, [])
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Drawer"
            activeColor="black"
            barStyle={{ backgroundColor: '#ffffff' }}>
            <Tab.Screen
                name="Drawer"
                component={Drawer}
                options={{
                    tabBarLabel: <Entypo name="dot-single" size={15} />,
                    tabBarIcon: ({ color }) => (
                        <Octicons name="home" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="manageAds"
                component={manageAds}
                options={{
                    tabBarLabel: <Entypo name="dot-single" size={15} />,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="staro" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="Ads"
                component={Ads}
                options={{
                    tabBarLabel: <Entypo name="dot-single" size={15} />,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="plussquareo" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarLabel: <Entypo name="dot-single" size={15} />,

                    tabBarIcon: ({ color }) => (
                        <Fontisto name="email" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: <Entypo name="dot-single" size={15} />,

                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" color={color} size={23} />
                    ),
                }}
            />

            {/* <Tab.Screen
                name="Profile"
                component={Profile}
                
                options={{
                    tabBarLabel: <Entypo name="dot-single" size={15} />,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" color={color} size={23} />
                    ),
                }}
            /> */}

        </Tab.Navigator>

    );
}