import React, { useState } from 'react';
import Navigation from './Navigation/Navigation';
import { TokenContext, UsernameContext } from './Contexte/Context';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
      <MenuProvider>
        <UsernameContext.Provider value={[username, setUsername]}>
          <TokenContext.Provider value={[token, setToken]}>
            <Navigation/>
          </TokenContext.Provider>
        </UsernameContext.Provider>
      </MenuProvider>
  );
}
