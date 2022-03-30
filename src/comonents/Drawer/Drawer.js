import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import manageAds from '../../screens/ManageAds/ManageAds';
import PremiumAddsManage from '../../screens/PremiumAddsManage.js/PremiumAddsManage';
import Inbox from '../../screens/Inbox/Inbox';
import Home from '../../screens/Home/Home';
import Ads from '../../screens/Ads/Ads';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Login from '../../screens/Login/Login';
import Profile from '../../screens/Profile/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomDrawer from '../CustomDrawer/CustomDrawer';
import Get_offer from '../../category/Get_offer/Get_offer';
import Logout from '../../screens/Logout/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'

const drawer = createDrawerNavigator();

function Drawer() {

    const [data, setData] = React.useState([])
    const [user, setUser] = React.useState({})
    const [modal, setmodal] = React.useState(false)
  
    const getData = async () => {
      const value = await AsyncStorage.getItem('uid');
      setUser(JSON?.parse(value))
  }
  
  
  
    React.useEffect(() => {
      getData()
      firestore()
        .collection('Users')
        .doc(user.USER_ID)
        .collection('send_offer')
        .onSnapshot(e =>
          setData(e.docs.map((c) => c.data())))
    }, [])

    console.log()
    const LAGON = 'login'
    return (
        <drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#00aa49',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: 'black',
                drawerLabelStyle: { marginLeft: -10, fontFamily: 'Roboto-Medium', fontSize: 15 }
            }}>
            <drawer.Screen name="Home" component={Home}
                options={{
                    drawerIcon: ({ color }) =>
                    (
                        <Octicons name="home" color={color} size={25} />
                    )

                }}
            />
            <drawer.Screen name="Login" component={Login}
                options={{
                    drawerIcon: ({ color }) =>
                    (
                        <AntDesign name="login" color={color} size={25} />
                    )
                }}
            />
            <drawer.Screen
                name="Ads"
                component={Ads}
                options={{
                    drawerIcon: ({ color }) =>
                    (
                        <SimpleLineIcons name="camera" color={color} size={25} />
                    )
                }}
            />
            <drawer.Screen name="Profile" component={Profile}
                options={{
                    drawerIcon: ({ color }) =>
                    (
                        <AntDesign name="user" color={color} size={25} />
                    )

                }}
            />
            <drawer.Screen name="Inbox" component={Inbox}
                options={{
                    drawerIcon: ({ color }) =>
                    (
                        <Octicons name="home" color={color} size={25} />
                    )

                }}
            />
            <drawer.Screen name={`Bids ${ data.length === 0 ? null  : ` (` + data.length + `)`}`} component={Get_offer}
                options={{
                    
                    drawerIcon: ({ color }) =>
                    (
                        <AntDesign name="book" color={color} size={25} />
                    )

                }}
            />
            <drawer.Screen name={`Logout`} component={Logout}
                options={{
                    drawerIcon: ({ color }) =>
                    (
                        <AntDesign name="login" color={color} size={25} />
                    )

                }}
            />
        </drawer.Navigator>
    );
}

export default Drawer;