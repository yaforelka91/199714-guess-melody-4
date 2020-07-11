import {extend} from '../../utils.js';
import {GameType} from '../../const.js';


const initialState = {
  mistakes: 0,
  step: -1,
  maxMistakes: 3,
};

const isArtistAnswerCorrect = (question, answer) => {
  return answer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, answer) => {
  return answer.every((item, index) => {
    return item === (question.answers[index].genre === question.genre);
  });
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  incrementMistakes: (question, answer) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        isAnswerCorrect = isArtistAnswerCorrect(question, answer);
        break;
      case GameType.GENRE:
        isAnswerCorrect = isGenreAnswerCorrect(question, answer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },
  resetGame: () => {
    return {
      type: ActionType.RESET,
      payload: null,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.RESET:
      return extend(initialState, {
        step: 0,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
