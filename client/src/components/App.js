import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import Names from './Names';
import Spinner from './Spinner';
import ErrorView from './ErrorView';
import { callBackend } from '../api/api';
import { insertName, errorMsg, amountOfName, totalAmount } from '../messages/Messages'
import * as routes from '../constants/routes';

export default function App() {
  const [data, setData] = useState([]);
  const [param, setParam] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Run on first render and everytime the state param is changed
  useEffect(() => {
    setIsLoading(true);
    // Get all data in the order specified by param (null is default order)
    callBackend(routes.BASE_URL, param).then(result => {
      if (!result.error) {
        setData(result);
      }
      else {
        setError(result.error.response.statusText);
      }
    }).then(() => setIsLoading(false));
  }, [param]);

  // Get a number of total amount of names in data from backend
  function getTotalAmount() {
    setIsLoading(true);
    // Call the backend for data
    callBackend(routes.TOTAL_AMOUNT).then(result => {
      // Show a message about the total amount of names returned by backend
      totalAmount(result.namesTotal);
    }).then(() => setIsLoading(false));
  }

  // Start searching for data about a name if a name is given
  function startSearch() {
    // Show a message if no name is given
    if (!search) {
      insertName();
    }
    else {
      // Convert the search string to match the format that the backend expects
      const name = search[0].toUpperCase() + search.slice(1).toLowerCase();
      // Start the call to the backend with prepared name
      getNameAmount(name);
    }
  }

  // Get data of the given name from backend and show message about the result
  function getNameAmount(name) {
    setIsLoading(true);
    // Call the backend for data
    callBackend(`${routes.BASE_URL}/${name}`).then(result => {
      // Show the data of the given name if there is no error
      if (!result.error) {
        amountOfName(result);
      }
      // Show an error message if no data can be found
      else {
        errorMsg(result.error.response.data.error);
      }
    }).then(() => setIsLoading(false));
    setSearch('');
  }

  // If there are errors, show an errror message on screen without rendering other components
  if (error) {
    return (
      <ErrorView error={error}/>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <div className='wrapper'>
        <Sidebar onParamChange={setParam} getTotalAmount={getTotalAmount} search={search} onSearchChange={setSearch} startSearch={startSearch}/>
        {/* Render Spinner if the data is loading, otherwise render Names */}
        {isLoading? <Spinner/> : <Names data={data}/>}
      </div>
    </React.Fragment>
  );
}
