import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000'); 
  const [brushSize, setBrushSize] = useState(5); 
  const [isEraser, setIsEraser] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const startDrawing = (e) => {
    setIsDrawing(true);
    lastPosition.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  const drawOrErase = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = lastPosition.current;

    ctx.lineWidth = brushSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (isEraser) {
      ctx.strokeStyle = 'white';
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.strokeStyle = brushColor;
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();

    lastPosition.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveCanvas = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'drawing.png';
    a.click();
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  return (
    <div className="App">
      <h1>React Paint App</h1>
      <div className="controls">
        <label>
          Brush Color:
          <input 
            type="color" 
            value={brushColor} 
            onChange={(e) => setBrushColor(e.target.value)} 
            disabled={isEraser}
          />
        </label>
        <label>
          Brush Size:
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={brushSize} 
            onChange={(e) => setBrushSize(e.target.value)} 
          />
        </label>
        <button onClick={toggleEraser}>{isEraser ? 'Switch to Draw' : 'Switch to Eraser'}</button>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveCanvas}>Save</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black', cursor: isEraser ? 'pointer' : 'crosshair' }}
        onMouseDown={startDrawing}
        onMouseMove={drawOrErase}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

export default App;
