import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

// eslint-disable-next-line react/prop-types
const App = ({errorCount}) => {
  return <WelcomeScreen errorCount={errorCount} />;
};

export default App;
