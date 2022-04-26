/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import store from './src/redux/Index';
import {AuthProvider} from './src/context/Auth';
const Root = () => (
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Root);
