import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/comonents/Stack/Stack';
import LoginStack from './src/comonents/Stack/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
export default function App() {
  const [save, setSave] = React.useState({});
  const uid = useSelector(state => state.user)
  console.log("Uid in app.js",uid)

  const get_data = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      console.log(value)
      if (value !== 'null') {
        // We have data!!
        setSave(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  React.useEffect(() => {
    get_data()
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {uid?.CONFIRM_PASSWORD || save?.CONFIRM_PASSWORD ? <MyStack /> : <LoginStack />}
    </NavigationContainer>
  );
}
