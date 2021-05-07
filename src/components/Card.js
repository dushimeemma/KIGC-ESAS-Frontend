import React from 'react';

import { Col, Spinner } from 'reactstrap';

const Card = ({ count, text, onClick, isLoading }) => {
  return (
    <Col onClick={onClick} md='3' className='my-5 mx-auto'>
      <div className='mx-auto text-center rounded cards-bg py-2 px-2'>
        <div className='py-3 rounded-circle  w-25 mx-auto'>
          <i className='fas fa-tachometer-alt'></i>
        </div>
        {!isLoading ? (
          <span className='border border-danger w-25 bg-danger px-2 text-white'>
            {count}
          </span>
        ) : (
          <Spinner color='light' size='sm' />
        )}

        <p className='text-capitalize'>{text}</p>
      </div>
    </Col>
  );
};

export default Card;
