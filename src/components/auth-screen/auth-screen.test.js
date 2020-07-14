import React from 'react';
import renderer from 'react-test-renderer';
import AuthScreen from './auth-screen.jsx';

describe(`AuthScreenSnapshot`, () => {
  it(`AuthScreen component render correctly`, () => {
    const tree = renderer.create(
        <AuthScreen
          onReplayButtonClick={() => {}}
          onFormSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
