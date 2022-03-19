import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/comonents/Stack/Stack';
import LoginStack from './src/comonents/Stack/LoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [save, setSave] = React.useState(null);



  React.useEffect(() => {
    const get_data = async () => {

      try {
        const userDetail = await AsyncStorage.getItem('uid')
        const check = JSON.stringify(userDetail);
        console.log("My ", check)
        setSave(check)
        // console.log("DATA => ", check)
      } catch (e) {
        // error reading value
        console.log(e);
      }
    }
    get_data()
  }, [save])
  console.log("Check => ", save)

  return (
    <NavigationContainer>
      {save === '' || save === 'null' ?
        <LoginStack />
        :
        <MyStack />
      }
    </NavigationContainer>
  );
}