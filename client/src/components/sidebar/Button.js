import React from 'react';
import './Button.css';

export default function Button(props) {
  return (
    <div>
      <button type='button' className='btn mb-2' onClick={() => props.callFunc(props.param)}>
        {props.text}
      </button>
    </div>
  );
}