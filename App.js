import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './src/comonents/Bottom/BottomNav';
// import Drawer from './src/comonents/Drawer/Drawer';

export default function App() {
  return (
    <NavigationContainer>
      <BottomNav />
      {/* <Drawer /> */}
    </NavigationContainer>
  );
}