import React, { Component } from 'react';
import spin from  "./Spin.gif";

export class Spin extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spin} alt="loading"/>
      </div>
    )
  }
}

export default Spin