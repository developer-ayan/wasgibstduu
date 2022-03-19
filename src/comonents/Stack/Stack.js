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
function MyStack() {

    const [save , setSave] = React.useState()

    const get_data = async() => {

        try {
            const userDetail = await AsyncStorage.getItem('userData')
            const check = JSON.parse(userDetail);
            setSave(check)
            console.log("DATA => ", check)
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    React.useEffect(() => {

        get_data()

    }, [])
    return (
        
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal', animation: 'slide_from_right', }}>

            {/* Authentication  */}

            {/* {!save ? 
            
        } */}
            

            {/* bottom navigation */}

            <Stack.Screen name="BottomNav" component={BottomNav} options={{ animation: 'slide_from_right' }} />

            {/* Display Screens */}

            <Stack.Screen name="PremiumAddsManage" component={PremiumAddsManage} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="chatscreen" component={ChatScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="manageAds" component={manageAds} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Your_Ads" component={Your_Ads} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Inbox" component={Inbox} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Home" component={Home} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Ads" component={Ads} options={{ animation: 'slide_from_right' }} />


            <Stack.Screen name="searchbar" component={SearchBar} options={{ animation: 'slide_from_right' }} />

            {/* Category */}

            <Stack.Screen name="Categories_detail" component={Categories_detail} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Phone_and_Screen" component={Phone_and_Screen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Send_offer" component={Send_offer} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Auto_Mobiles" component={Auto_Mobiles} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Real_states" component={Real_states} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Electronics" component={Electronics} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Learning" component={Learning} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Services" component={Services} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Fashion" component={Fashion} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Events" component={Events} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Jobs" component={Jobs} options={{ animation: 'slide_from_right' }} />

        </Stack.Navigator>
    );
}
export default MyStack;