import React, { Component } from 'react';
import './App.css';
import NewsFeed from './components/NewsFeed/NewsFeed';

class App extends Component { 
  render () {
    return (
      <div>
        <NewsFeed/>
      </div>
    );
  }
}

export default App;
