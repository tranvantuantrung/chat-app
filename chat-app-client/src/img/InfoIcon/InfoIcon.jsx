import React from 'react';

const InfoIcon = ({ width, height, margin, active = false }) => {
  if (active) {
    return (
      <svg
        aria-label='info'
        fill='#262626'
        role='img'
        viewBox='0 0 48 48'
        style={{ width, height, margin }}
      >
        <path d='M24 0a24 24 0 1024 24A23.94 23.94 0 0024 0zm0 12.3a2.58 2.58 0 012.6 2.6 2.52 2.52 0 01-2.6 2.6 2.6 2.6 0 010-5.2zm3.1 23.4H21a1.5 1.5 0 010-3h1.5v-9.2H21a1.5 1.5 0 010-3h3a1.54 1.54 0 011.5 1.5v10.7H27a1.54 1.54 0 011.5 1.5 1.34 1.34 0 01-1.4 1.5z'></path>
      </svg>
    );
  }

  return (
    <svg
      aria-label='info'
      fill='#262626'
      role='img'
      viewBox='0 0 48 48'
      style={{ width, height, margin }}
    >
      <path d='M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z'></path>
      <circle
        clipRule='evenodd'
        cx='24'
        cy='14.8'
        fillRule='evenodd'
        r='2.6'
      ></circle>
      <path d='M27.1 35.7h-6.2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h6.2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z'></path>
      <path d='M24 35.7c-.8 0-1.5-.7-1.5-1.5V23.5h-1.6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5H24c.8 0 1.5.7 1.5 1.5v12.2c0 .8-.7 1.5-1.5 1.5z'></path>
    </svg>
  );
};

export default InfoIcon;
