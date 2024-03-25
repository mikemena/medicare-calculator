import React from 'react';
import ServiceSelector from './components/ServiceSelector';
import './App.css';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className="calculator-container">
      <div className="title-container">
        <img className="logo" src={logo} alt="SVG Image" />
        <h1 className="app-title">8-Minute Rule Calculator</h1>
      </div>
      <form>
        <ServiceSelector />
      </form>
    </div>
  );
}

export default App;
