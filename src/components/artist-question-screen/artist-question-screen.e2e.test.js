import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const question = {
  type: `artist`,
  song: {
    artist: ``,
    src: ``
  },
  answers: [
    {
      artist: `Singer 1`,
      picture: `pic1`,
    },
    {
      artist: `Singer 2`,
      picture: `pic2`,
    },
    {
      artist: `Singer 3`,
      picture: `pic3`,
    },
  ],
};

const mockEvent = {
  preventDefault() {}
};

describe(`ArtistQuestionScreenE2E`, () => {
  it(`Check data-format in callback after user's answer`, () => {
    const onAnswer = jest.fn();
    const userAnswer = {
      artist: `Singer 1`,
      picture: `pic1`,
    };

    const screen = shallow(
        <ArtistQuestionScreen
          onAnswer={onAnswer}
          question={question}
        />
    );

    const answerInputs = screen.find(`input`);
    const answerOne = answerInputs.at(0);

    answerOne.simulate(`change`, mockEvent);

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
  });
});
