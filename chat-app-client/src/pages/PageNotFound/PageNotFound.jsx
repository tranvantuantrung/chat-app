import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import './PageNotFound.scss';

const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Chat App - Page Not Found';
  }, []);

  return (
    <div className='page-not-found'>
      <div className='container'>
        <div className='page-not-found__wrapper'>
          <h2 className='page-not-found__title'>
            Sorry, this page isn't available.
          </h2>
          <div className='page-not-found__text'>
            The link you followed may be broken, or the page may have been
            removed. <Link to='/'>Go back.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
