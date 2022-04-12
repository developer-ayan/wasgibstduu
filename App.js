import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/comonents/Stack/Stack';
import LoginStack from './src/comonents/Stack/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
import { AuthContext } from './src/context/Auth';
export default function App() {
  const [save, setSave] = React.useState({});
  const uid = useSelector(state => state.user)
 const {setUser} = useContext(AuthContext)

  const get_data = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== 'null') {
        setSave(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  setUser(uid?.CONFIRM_PASSWORD || save?.CONFIRM_PASSWORD ? save : uid)

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
