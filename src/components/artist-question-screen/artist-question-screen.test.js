import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen.jsx';

const question = {
  type: `artist`,
  song: {
    artist: `Singer 1`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
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
};

describe(`ArtistQuestionScreenSnapshots`, () => {
  it(`should render ArtistQuestionScreen`, () => {
    const tree = renderer.create(
        <ArtistQuestionScreen
          question={question}
          onAnswer={() => {}}
          renderPlayer={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
