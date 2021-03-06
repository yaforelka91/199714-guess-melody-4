import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const mockStore = configureStore([]);

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `jazz`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `pop`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      }
    ]
  },
  {
    type: `artist`,
    song: {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      artist: `Blink 182`,
    },
    answers: [
      {
        picture: `http://placekitten.com/134/134`,
        artist: `Singer 1`,
      }, {
        picture: `http://placekitten.com/134/134`,
        artist: `Singer 2`,
      }, {
        picture: `http://placekitten.com/134/134`,
        artist: `Singer 3`,
      }
    ],
  }
];

describe(`AppSnapshots`, () => {
  it(`should render WelcomeScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={() => {}}
            mistakes={0}
            maxMistakes={3}
            questions={questions}
            onAnswer={() => {}}
            resetGame={() => {}}
            onWelcomeButtonClick={() => {}}
            step={-1}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render GenreQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={() => {}}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onAnswer={() => {}}
            resetGame={() => {}}
            onWelcomeButtonClick={() => {}}
            step={0}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render ArtistQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={() => {}}
            maxMistakes={3}
            questions={questions}
            mistakes={0}
            onAnswer={() => {}}
            resetGame={() => {}}
            onWelcomeButtonClick={() => {}}
            step={1}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render GameOverScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            login={() => {}}
            maxMistakes={3}
            mistakes={3}
            questions={questions}
            onAnswer={() => {}}
            resetGame={() => {}}
            onWelcomeButtonClick={() => {}}
            step={1}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render WinScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.AUTH}
            login={() => {}}
            maxMistakes={3}
            mistakes={0}
            questions={questions}
            onAnswer={() => {}}
            resetGame={() => {}}
            onWelcomeButtonClick={() => {}}
            step={3}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render AuthScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              login={() => {}}
              maxMistakes={3}
              mistakes={0}
              questions={questions}
              onAnswer={() => {}}
              resetGame={() => {}}
              onWelcomeButtonClick={() => {}}
              step={3}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
