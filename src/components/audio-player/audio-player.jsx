import React, {PureComponent, Fragment, createRef} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };

    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  _handleButtonClick() {
    const {onPlayButtonClick} = this.props;
    this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
    onPlayButtonClick();
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false,
      });
    };

    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    audio.onpause = () => {
      this.setState({
        isPlaying: false,
      });
    };

    audio.ontimeupdate = () => {
      this.setState({
        progress: audio.currentTime,
      });
    };
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;
    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  render() {
    const {isPlaying, isLoading} = this.state;
    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._handleButtonClick}
        >
        </button>
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </Fragment>
    );
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (audio) {
      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
