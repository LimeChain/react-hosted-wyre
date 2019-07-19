import React from 'react'
import WyreWidget from './WyreWidget'
import TopUpSuccess from './TopUpSuccess';
import './App.css';
import { Route } from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Route path="/invest" component={WyreWidget} />
        <Route path="/success" component={TopUpSuccess} />
      </div >
    );
  }

}

export default App;
