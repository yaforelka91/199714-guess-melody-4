import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withAudio from "./with-audio.js";

configure({
  adapter: new Adapter()
});

const Player = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

Player.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

describe(`withAudioE2E`, () => {
  it(`Checks that HOC's callback turn on audio (play)`, () => {
    const PlayerWrapped = withAudio(Player);

    let isPlaying = false;
    const onPlayButtonClick = jest.fn(() => {
      isPlaying = !isPlaying;
      wrapper.setProps({isPlaying});
    });

    const wrapper = mount(
        <PlayerWrapped
          isPlaying={isPlaying}
          onPlayButtonClick={onPlayButtonClick}
          src=""
        />
    );

    window.HTMLMediaElement.prototype.play = () => {};

    const {_audioRef} = wrapper.instance();

    jest.spyOn(_audioRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button`).simulate(`click`);

    expect(_audioRef.current.play).toHaveBeenCalledTimes(1);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
    expect(wrapper.props().isPlaying).toEqual(true);
  });

  it(`Checks that HOC's callback turn off audio (pause)`, () => {
    const PlayerWrapped = withAudio(Player);

    let isPlaying = true;
    const onPlayButtonClick = jest.fn(() => {
      isPlaying = !isPlaying;
      wrapper.setProps({isPlaying});
    });

    const wrapper = mount(
        <PlayerWrapped
          isPlaying={isPlaying}
          onPlayButtonClick={onPlayButtonClick}
          src=""
        />);

    window.HTMLMediaElement.prototype.pause = () => {};

    const {_audioRef} = wrapper.instance();

    jest.spyOn(_audioRef.current, `pause`);

    wrapper.instance().componentDidMount();

    wrapper.find(`button`).simulate(`click`);

    expect(_audioRef.current.pause).toHaveBeenCalledTimes(1);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
    expect(wrapper.props().isPlaying).toEqual(false);
  });
});
