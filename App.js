import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/comonents/Stack/Stack';

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}