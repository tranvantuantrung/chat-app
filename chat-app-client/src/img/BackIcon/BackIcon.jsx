import React from 'react';

const BackIon = ({ width, height, margin }) => {
  return (
    <svg
      aria-label='Back'
      fill='#262626'
      role='img'
      viewBox='0 0 48 48'
      style={{ width, height, margin }}
    >
      <path d='M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z'></path>
    </svg>
  );
};

export default BackIon;
