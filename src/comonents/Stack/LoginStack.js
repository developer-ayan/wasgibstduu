import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNav from '../Bottom/BottomNav';

// Auth Screen

import Inbox from '../../screens/Inbox/Inbox';
import Login from '../../screens/Login/Login';

// Display Screens

import Home from '../../screens/Home/Home';
import Ads from '../../screens/Ads/Ads';
import SignUp from '../../screens/SignUp/SignUp';
import manageAds from '../../screens/ManageAds/ManageAds';
import PremiumAddsManage from '../../screens/PremiumAddsManage.js/PremiumAddsManage';
import Profile from '../../screens/Profile/Profile';
import ChatScreen from '../../screens/Inbox/ChatScreen'

// Category 

import Auto_Mobiles from '../../category/Auto_mobiles/Auto_mobiles';
import Electronics from '../../category/Electronics/Electronics';
import Events from '../../category/Events/Events';
import Fashion from '../../category/Fashion/Fashion';
import Jobs from '../../category/Jobs/Jobs';
import Learning from '../../category/Learning/Learning';
import Phone_and_Screen from '../../category/Phone_&_Elec/Phone_&_Elec';
import Real_states from '../../category/Real_States/Real_States';
import Services from '../../category/Services/Services';
import Categories_detail from '../../category/Categories_detail/Categories_detail';
import Drawer from '../Drawer/Drawer';
import SearchBar from '../../screens/Search/SearchBar';
import Your_Ads from '../../screens/Your_Ads/Your_Ads';
import Send_offer from '../../category/Send_offer/Send_offer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
function LoginStack() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal', animation: 'slide_from_right', }}>
            <Stack.Screen name="Login" component={Login} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="signup" component={SignUp} options={{ animation: 'slide_from_right' }} />
        </Stack.Navigator>
    );
}
export default LoginStack;