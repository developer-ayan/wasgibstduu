import React, {createContext, useCallback, useEffect, useState} from 'react';

export const AuthContext = createContext({});
export const AuthProvider = props => {
  // const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider
      value={{
        user,

        setUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
