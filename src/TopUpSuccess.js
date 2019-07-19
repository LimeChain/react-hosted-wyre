import React from 'react'
import './App.css';

class TopUpSuccess extends React.Component {

  constructor(props) {
    super(props)

    const urlParams = new URLSearchParams(window.location.search);
    const txHash = urlParams.get('txHash');
    console.log(txHash);

  }

  render() {
    return (
      <div>
        Top up successful!
      </div >
    );
  }
}

export default TopUpSuccess;
