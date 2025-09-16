import { getConfig } from '@testing-library/dom';
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
      xLastPoint: xSize
    }
  }

  return (
    <div className="App">
      <FieldContext.Provider value={getConfig(50, 13, 18)}>
        <Field/>
      </FieldContext.Provider>
    </div>
  );
}

export default App;
