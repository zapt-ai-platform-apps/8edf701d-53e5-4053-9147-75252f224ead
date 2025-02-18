import React, { createContext, useContext } from 'react';
import { useProvideAuth } from './useProvideAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}