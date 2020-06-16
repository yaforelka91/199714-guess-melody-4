const AVATAR_URL = `https://picsum.photos/134`;

export default [
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
        picture: AVATAR_URL,
        artist: `Sum 41`,
      },
      {
        picture: AVATAR_URL,
        artist: `Blink 182`,
      },
      {
        picture: AVATAR_URL,
        artist: `Green Day`,
      },
    ]
  }
];
