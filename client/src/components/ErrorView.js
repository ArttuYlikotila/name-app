import React from 'react';

export default function ErrorView(props) {
  return (
    <div className='card w-50 mx-auto mt-5'>
      <div className='card-header'>Error!</div>
      <div className='card-body'>{props.error}</div>
    </div>
  );
}