import React, { useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  return (
    <div className="App">
      <h1>React Paint App</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
}

export default App;
