import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user data (e.g., after login or signup)
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
