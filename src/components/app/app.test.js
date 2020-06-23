import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const errorCount = 3;

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
  it(`should render App`, () => {
    const tree = renderer.create(
        <App errorCount={errorCount} questions={questions} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});