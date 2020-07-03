import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import GenreQuestionItem from '../genre-question-item/genre-question-item.jsx';
import {GameType} from '../../const.js';

class GenreQuestionScreen extends PureComponent {
  render() {
    const {onAnswer, onChange, question, renderPlayer, userAnswers} = this.props;
    const {answers, genre} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}
        >
          {answers.map((answer, index) => (
            <GenreQuestionItem
              answer={answer}
              id={index}
              key={`${index}-${answer.src}`}
              onChange={onChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[index]}
            />
          ))}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default GenreQuestionScreen;
