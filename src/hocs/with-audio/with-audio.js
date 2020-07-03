import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
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

    _handleButtonClick() {
      const {onPlayButtonClick} = this.props;
      this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
      onPlayButtonClick();
    }

    render() {
      const {isPlaying, isLoading} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayButtonClick={this._handleButtonClick}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
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

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};
export default withAudio;
