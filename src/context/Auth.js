import React, {createContext, useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});
export const AuthProvider = props => {
  const [user, setUser] = useState({});
  const [bids, setBids] = useState(null);
  const [messageCounting, setMessageCounting] = useState([]);
  const [bidslength, setBidsLength] = useState(0);

  firestore()
    .collection('Category')
    .get()
    .then(correct => {
      correct.forEach(snapshot => {
        firestore().collection('Category').doc(snapshot.id).update({
          AUTO_ID: snapshot.id,
        });
      });
    });

  // const get_data = async () => {

  //   try {
  //     const value = await AsyncStorage.getItem('uid');
  //     // console.log("Async strogare"  ,JSON.parse(value));
  //     // setSave(JSON.parse(value))

  //     if (value !== 'null' || value !== null) {
  //       setSave(JSON.parse(value));
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  const get_data = async () => {

    console.log('ayan')

    // try {
      const value = await AsyncStorage.getItem('uid');
      // console.log("Async strogare"  ,JSON.parse(value));
      // setSave(JSON.parse(value))

      if (value !== 'null' || value !== null) {
        setUser(JSON.parse(value));
      }
    // } catch (error) {
    //   // Error retrieving data
    // }
  };
  useEffect(() => {
    

    get_data();
  }, [get_data]);

  return (
    <AuthContext.Provider
      value={{
        user,
        bids,
        messageCounting,
        bidslength,

        setUser,
        setBids,
        setMessageCounting,
        setBidsLength,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
