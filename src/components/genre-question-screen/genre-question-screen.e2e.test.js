import React from 'react';
import Enzyme, {mount} from 'enzyme';
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
    const onAnswer = jest.fn();
    const userAnswer = [true, false, false, false];

    const genreQuestion = mount(
        <GenreQuestionScreen
          onAnswer={onAnswer}
          onChange={() => {}}
          question={question}
          renderPlayer={() => {}}
          userAnswers={userAnswer}
        />
    );

    const form = genreQuestion.find(`form`);
    const inputOne = genreQuestion.find(`input`).at(0);

    inputOne.simulate(`change`, {target: {checked: true}});
    form.simulate(`submit`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);

    expect(onAnswer.mock.calls[0][0]).toEqual(void 0);

    expect(
        genreQuestion.find(`input`).map((item) => item.prop(`checked`))
    ).toEqual(userAnswer);
  });
});
