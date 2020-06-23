import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    _handleButtonClick(index) {
      this.setState((prevState) => ({
        activePlayerId: prevState.activePlayerId === index ? -1 : index
      }));
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          renderPlayer={(src, id) => {
            return (
              <AudioPlayer
                src={src}
                isPlaying={id === activePlayerId}
                onPlayButtonClick={this._handleButtonClick.bind(this, id)}
              />
            );
          }}
          {...this.props}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;