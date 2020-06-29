import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

describe(`MistakesSnapshot`, () => {
  it(`should render with 0`, () => {
    const tree = renderer
      .create(
          <Mistakes
            count={0}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render with 0 mistake`, () => {
    const tree = renderer
      .create(
          <Mistakes
            count={1}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
