import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `song1`,
      genre: `rock`,
    },
    {
      src: `song2`,
      genre: `jazz`,
    },
    {
      src: `song3`,
      genre: `pop`,
    },
    {
      src: `song4`,
      genre: `pop`,
    }
  ],
};

const mockEvent = {
  preventDefault() {}
};

describe(`GenreQuestionScreenE2E`, () => {
  it(`Check data-format in callback after user's answer`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    const userAnswer = [true, false, false, false];

    const genreQuestion = shallow(
        <GenreQuestionScreen
          onAnswer={onAnswer}
          question={question}
          renderPlayer={() => {}}
        />
    );

    const form = genreQuestion.find(`form`);
    const inputOne = genreQuestion.find(`input`).at(0);

    inputOne.simulate(`change`, {target: {checked: true}});
    form.simulate(`submit`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);

    expect(genreQuestion.find(`input`).map((item) => item.prop(`checked`))).toEqual(userAnswer);
  });
});
