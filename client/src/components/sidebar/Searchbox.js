import React from 'react';
import './Searchbox.css';

export default function Searchbox(props) {
  // Change the state value of parent component
  function handleValueChange(e) {
    props.onSearchChange(e.target.value)
  }

  // Start the search if the user pressses enter
  function triggerSearch(e) {
    if (e.key === 'Enter') {
      props.startSearch();
    }
  }

  return (
    <div className='input-group'>
      <input 
        type='text' 
        className='form-control' 
        placeholder='Name' 
        value={props.search}
        onChange={handleValueChange}
        onKeyPress={triggerSearch}
      />
      <div className='input-group-append'>
        <button className='btn' type='button' onClick={props.startSearch}>
          Search
        </button>
      </div>
    </div>
  );
}