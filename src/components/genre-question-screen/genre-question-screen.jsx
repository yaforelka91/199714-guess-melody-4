import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {GameType} from '../../const.js';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswers: [false, false, false, false],
    };
  }

  render() {
    const {onAnswer, question} = this.props;
    const {userAnswers} = this.state;
    const {answers, genre} = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={(evt) => {
              evt.preventDefault();
              onAnswer(question, this.state.userAnswers);
            }}
          >
            {answers.map((answer, index) => (
              <div className="track" key={answer.genre + index}>
                <button className="track__button track__button--play" type="button"></button>
                <div className="track__status">
                  <audio src={answer.src}></audio>
                </div>
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer"
                    value={`answer-${index}`} id={`answer-${index}`} checked={userAnswers[index]}
                    onChange={(evt) => {
                      this.setState({
                        userAnswers: [...userAnswers.slice(0, index), evt.target.checked, ...userAnswers.slice(index + 1)],
                      });
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>
            ))}
            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
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
};

export default GenreQuestionScreen;
