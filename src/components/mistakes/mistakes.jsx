import React from 'react';
import PropTypes from 'prop-types';

const Mistakes = ({count}) => {
  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((mistake, index) => {
        return <div key={`mistake-${index}`} className="wrong" />;
      })}
    </div>
  );
};

Mistakes.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Mistakes;
