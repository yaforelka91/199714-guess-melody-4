import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operation} from './data.js';

const api = createAPI(() => {});

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
        picture: `https://picsum.photos/134`,
        artist: `Sum 41`,
      }, {
        picture: `https://picsum.photos/134`,
        artist: `Blink 182`,
      }, {
        picture: `https://picsum.photos/134`,
        artist: `Green Day`,
      }
    ],
  }
];

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      questions: []
    });
  });

  it(`Reducer should update questions by load questions`, () => {
    expect(reducer({
      questions: [],
    }, {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    })).toEqual({
      questions,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
        .onGet(`/questions`)
        .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_QUESTIONS,
            payload: [{fake: true}],
          });
        });
  });
});
