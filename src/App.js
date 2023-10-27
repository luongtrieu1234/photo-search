import React from 'react';
import './App.css';
import PhotoSearch from './PhotoSearch';

function App() {
  return (
    <div className="App">
      <h1 style={{ color: "#2979ff", fontSize: 50 }}>Photo Search</h1>
      <div style={{ width: "100%" }}>
        <PhotoSearch />
      </div>
    </div>
  );
}


export default App;
