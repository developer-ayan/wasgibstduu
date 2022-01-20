import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import manageAds from '../../screens/ManageAds/ManageAds';
import PremiumAddsManage from '../../screens/PremiumAddsManage.js/PremiumAddsManage';
import Ads from '../../screens/Ads/Ads';
import Inbox from '../../screens/Inbox/Inbox';
import Home from '../../screens/Home/Home';

const drawer = createDrawerNavigator();

function Drawer() {
  return (
    <drawer.Navigator>
      <drawer.Screen name="Home" component={Home} />
      <drawer.Screen name="Inbox" component={Inbox} />
    </drawer.Navigator>
  );
}

export default Drawer;