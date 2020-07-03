import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionItem from './genre-question-item.jsx';

const answer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

describe(`GenreQuestionItem Snapshot`, ()=>{
  it(` should render GenreQuestionItem`, () => {
    const tree = renderer.create(
        <GenreQuestionItem
          answer={answer}
          id={0}
          onChange={() => {}}
          renderPlayer={() => {}}
          userAnswer={false}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
