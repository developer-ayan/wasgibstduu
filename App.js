import React, { useContext, useState } from 'react';
import {ActivityIndicator} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/comonents/Stack/Stack';
import LoginStack from './src/comonents/Stack/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
import { AuthContext } from './src/context/Auth';
export default function App() {
  const {setUser} = useContext(AuthContext)
  const [save, setSave] = React.useState({});
  const uid = useSelector(state => state.user)
  const [loading , setLoading] = useState(true)
 
  const get_data = async () => {
    setLoading(true)

    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== 'null') {
        setSave(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
    setLoading(false)

  };
  
  React.useEffect(() => {
    get_data()
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  setUser(uid?.CONFIRM_PASSWORD || save?.CONFIRM_PASSWORD ? save : uid)
  return loading ?
  <ActivityIndicator
      color={'black'}
      size={'large'}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} /> : (
    <NavigationContainer>
      {uid?.CONFIRM_PASSWORD || save?.CONFIRM_PASSWORD ? <MyStack /> : <LoginStack />}
    </NavigationContainer>
  );
}
