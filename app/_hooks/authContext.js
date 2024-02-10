// authContext.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getMyDetails } from '../_utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user , setUser] = useState({})

  useEffect(() => {
    async function fetchData(){
        const data = await getMyDetails();
        setUser(data.user);
        if(data.success == true)
        setIsLoggedIn(true)
    else
    setIsLoggedIn(false)
    console.log(data)
      }
  
      fetchData();
      console.log("auth")
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , user , setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
