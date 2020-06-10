import React from 'react';
import reactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const settings = {
    errorCount: 3,
  };

  reactDOM.render(
      <App errorCount={settings.errorCount} />,
      document.querySelector(`#root`)
  );
};

init();
