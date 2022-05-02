import React, {createContext, useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});
export const AuthProvider = props => {
  const [user, setUser] = useState({});
  const [bids, setBids] = useState(null);
  const [messageCounting, setMessageCounting] = useState([]);
  const [bidslength, setBidsLength] = useState(0);
  const [token, setToken] = useState('');

  console.log(token)


  const get_data = async () => {

    try {
      const value = await AsyncStorage.getItem('uid');
      // console.log("Async strogare"  ,JSON.parse(value));
      // setSave(JSON.parse(value))

      if (value !== 'null' || value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    get_data();
  }, [token]);

  console.log("token ",token)

  return (
    <AuthContext.Provider
      value={{
        user,
        bids,
        messageCounting,
        bidslength,
        token,

        setUser,
        setBids,
        setMessageCounting,
        setBidsLength,
        setToken
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
