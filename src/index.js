import React from 'react';
import reactDOM from 'react-dom';
import App from './components/app/app.jsx';
import questions from './mocks/questions.js';

const init = () => {
  const Settings = {
    ERROR_COUNT: 3,
  };

  reactDOM.render(
      <App
        errorCount={Settings.ERROR_COUNT}
        questions={questions}
      />,
      document.querySelector(`#root`)
  );
};

init();
