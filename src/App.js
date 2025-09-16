import { useRef } from 'react';
import './App.css';
import Field from './components/Field';
import FieldContext from './FieldContext';

function App() {

  const getConfig = (blockSize, xSize, ySize) => {
    return {
      step: blockSize,
      xSize: blockSize * xSize,
      ySize: blockSize * ySize,
      yLastPoint: ySize,
      xLastPoint: xSize,
      xBase: Math.floor(xSize / 2) - 2
    }
  }

  const maxX = 12;
  const maxY = 16;

  const stepOnW = Math.floor((window.innerWidth - 100) / maxX)
  const stepOnH = Math.floor((window.innerHeight - 100) / maxY)

  console.log(stepOnW)

  const stepSize = stepOnH > stepOnW ? stepOnW : stepOnH

  const config = getConfig(stepSize, maxX, maxY)

  return (
    <div className="App">
      <FieldContext.Provider value={config}>
        <Field/>
      </FieldContext.Provider>
    </div>
  );
}

export default App;
