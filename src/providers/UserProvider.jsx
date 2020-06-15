import React, { useState, useEffect, createContext } from "react";
import { auth, createUserDocument } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserDocument(userAuth);
      //   console.log(user);
      setUser(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
