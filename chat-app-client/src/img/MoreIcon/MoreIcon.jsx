import React from 'react';

const MoreIcon = ({ width, height, margin }) => {
  return (
    <svg
      aria-label='More'
      fill='#262626'
      role='img'
      viewBox='0 0 48 48'
      style={{ width, height, margin }}
    >
      <circle
        clipRule='evenodd'
        cx='8'
        cy='24'
        fillRule='evenodd'
        r='4.5'
      ></circle>
      <circle
        clipRule='evenodd'
        cx='24'
        cy='24'
        fillRule='evenodd'
        r='4.5'
      ></circle>
      <circle
        clipRule='evenodd'
        cx='40'
        cy='24'
        fillRule='evenodd'
        r='4.5'
      ></circle>
    </svg>
  );
};

export default MoreIcon;
