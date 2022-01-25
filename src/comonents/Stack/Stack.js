import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import BottomNav from '../Bottom/BottomNav';
import Ads from '../../screens/Ads/Ads';
import Inbox from '../../screens/Inbox/Inbox';
import Login from '../../screens/Login/Login';
import SignUp from '../../screens/SignUp/SignUp';
import manageAds from '../../screens/ManageAds/ManageAds';
import PremiumAddsManage from '../../screens/PremiumAddsManage.js/PremiumAddsManage';
import Profile from '../../screens/Profile/Profile';

const Stack = createStackNavigator();
function MyStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BottomNav" component={BottomNav} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Inbox" component={Inbox} />
            <Stack.Screen name="Ads" component={Ads} />
            <Stack.Screen name="manageAds" component={manageAds} />
            <Stack.Screen name="PremiumAddsManage" component={PremiumAddsManage} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}
export default MyStack;