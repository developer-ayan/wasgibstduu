import React, {createContext, useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

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
