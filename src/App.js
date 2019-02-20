import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './scss/week_picker.css';
import WeekPicker from './components/WeekPicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeekPicker/>
      </div>
    );
  }
}

export default App;
