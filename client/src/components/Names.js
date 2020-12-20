import React from 'react';
import './Names.css';

export default function Names(props) {
  // If data is not yet ready, return notification about it to prevent crash
  if (!props.data.names) {
    return (
      <div className='card w-50 mx-auto'>
        <div className='card-body'>No data yet</div>
      </div>
    );
  }
  
  // Map the data and return row-elements populated with names and amounts from data
  const names = props.data.names.map((row) => {
    return (
      <tr key={row.name}>
        <td>{row.name}</td>
        <td>{row.amount}</td>
      </tr>
    );
  })
  
  return (
    <div className='container'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          { names }
        </tbody>
      </table>
    </div>
  );
}