import React from 'react';
import { AuthContextProvider } from './contexts/AuthContext';
import { DataContextProvider } from './contexts/DataContext';
import Router from './router/Router';

export default function App() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <Router />
      </DataContextProvider>
    </AuthContextProvider>
  );
}

