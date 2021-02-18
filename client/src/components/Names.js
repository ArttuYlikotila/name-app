import React from 'react';
import './Names.css';

export default function Names(props) {  
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