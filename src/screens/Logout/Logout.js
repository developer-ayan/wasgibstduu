import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text} from 'react-native';

export default function Logout() {
  const removeData = async () => {
    await AsyncStorage.removeItem('uid');
  };
  React.useEffect(() => {
    removeData();
  }, []);
  return (
    <View>
      <Text>Ayan</Text>
    </View>
  );
}
