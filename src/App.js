import React, { Component } from 'react';
import Wmap from './components/Wmap';
// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Hooks
import { useAuthState, useDarkMode } from './hooks';
// Components
import Channel from './components/Channel';
import Loader from './components/Loader';

firebase.initializeApp({
  apiKey: "AIzaSyAlwgnETafa0JFgAWYfbPnEe1BycLlF5a8",
  authDomain: "wmapchat.firebaseapp.com",
  projectId: "wmapchat",
  storageBucket: "wmapchat.appspot.com",
  messagingSenderId: "623997961309",
  appId: "1:623997961309:web:92de103b097aa4c36e39b4",
  measurementId: "G-0SY71RB1Q2"
});

const MoonIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

const SunIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

function App() {
  const { user, initializing } = useAuthState(firebase.auth());
  const [darkMode, setDarkMode] = useDarkMode();

  const brandLogo = darkMode
    ? `${process.env.PUBLIC_URL}/logo_white.svg`
    : `${process.env.PUBLIC_URL}/logo.svg`;

  const ThemeIcon = darkMode ? SunIcon : MoonIcon;
  
  const renderContent = () => {
    if (initializing) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader size="lg" />
        </div>
      );
    }

    return <Channel user={user} />;
  }
  return (
    <div>
      <div className='mapContainer'>
        <Wmap/>
      </div>
      <div className='chatContainer'>
        <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
          <header
            className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md"
            style={{ height: 'var(--topbar-height)' }}
          >
            <p><b>WMapChat</b></p>
            <div className="flex items-center">
             
              <ThemeIcon
                className="h-8 w-8 cursor-pointer"
                onClick={() => setDarkMode(prev => !prev)}
              />
            </div>
          </header>
          <main
            className="flex-1"
            style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}
          >
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
