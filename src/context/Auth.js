import React, { createContext, useCallback, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext({});
export const AuthProvider = props => {
  const [user, setUser] = useState({});
  const [bids, setBids] = useState(null);
  const [messageCounting, setMessageCounting] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        bids,
        messageCounting,

        setUser,
        setBids,
        setMessageCounting,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
