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


const Stack = createStackNavigator();
function MyStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="BottomNav" component={BottomNav} />



            {/* bottom navigation */}


            {/* Display Screens */}

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Inbox" component={Inbox} />
            <Stack.Screen name="Ads" component={Ads} />
            <Stack.Screen name="manageAds" component={manageAds} />
            <Stack.Screen name="PremiumAddsManage" component={PremiumAddsManage} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="chatscreen" component={ChatScreen} />

            {/* Authentication  */}

            <Stack.Screen name="signup" component={SignUp} />

            {/* Category */}

            <Stack.Screen name="Categories_detail" component={Categories_detail} />
            <Stack.Screen name="Phone_and_Screen" component={Phone_and_Screen} />
            <Stack.Screen name="Auto_Mobiles" component={Auto_Mobiles} />
            <Stack.Screen name="Real_states" component={Real_states} />
            <Stack.Screen name="Electronics" component={Electronics} />
            <Stack.Screen name="Learning" component={Learning} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="Fashion" component={Fashion} />
            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="Jobs" component={Jobs} />


        </Stack.Navigator>
    );
}
export default MyStack;