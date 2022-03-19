import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/comonents/Stack/Stack';
import LoginStack from './src/comonents/Stack/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [save , setSave] = React.useState({});

  const get_data = async() => {

    try {
        const userDetail = await AsyncStorage.getItem('userData')
        const check = JSON.parse(userDetail);
         check != {} ?  setSave(check) : null;     
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
    <NavigationContainer>
      {!save ? 
      <LoginStack />
      :
      <MyStack />
    }
    </NavigationContainer>
  );
}