import React from 'react';
import ServiceSelector from './components/ServiceSelector';
import './App.css';

function App() {
  return (
    <div className="calculator-container">
      <h1 className="app-title">Medicare 8-Minute Rule Calculator</h1>
      <form>
        <ServiceSelector />
      </form>
    </div>
  );
}

export default App;
