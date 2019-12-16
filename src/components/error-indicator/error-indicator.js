import React from 'react';
import './error-indicator.css';

const ErrorIndicator = () => {
  return(
    <div className='error-indicator'>
      <img
          src='https://image.flaticon.com/icons/png/512/1832/1832382.png'
          alt='img-error'
          className='img-error' />
      <h2 className='error-text'>Oops... <span>Error</span></h2>
      <span className='error-details'>Don't worry, our drones are out to help</span>
    </div>
  ) 
};

export default ErrorIndicator;
