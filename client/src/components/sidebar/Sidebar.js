import React from 'react';
import Button from './Button';
import Searchbox from './Searchbox';

export default function Sidebar(props) {
  return (
    <div className='sidebar'>
      <div>Select the order of data:</div>
      <Button callFunc={props.onParamChange} param={null} text={'Default order'} />
      <Button callFunc={props.onParamChange} param={'amount'} text={'Most popular first'}/>
      <Button callFunc={props.onParamChange} param={'name'} text={'Alphabetical order'}/>
      <div className='mt-1'>Show the amount of data:</div>
      <Button callFunc={props.getTotalAmount} param={null} text={'Total amount'}/>
      <Searchbox search={props.search} onSearchChange={props.onSearchChange} startSearch={props.startSearch}/>
    </div>
  )
}