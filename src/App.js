import { createContext, useState } from 'react';
import './App.css';
import BankDetails from './screens/screen-one';
import ProcessingDetails from './screens/screen-two';

export const FormContext = createContext({});

function App() {
  const [formData, setFormContextData] = useState({});
  return (
    <div className="App">
      <FormContext.Provider value={setFormContextData}>
        {Object.keys(formData).length === 0 ?
          <BankDetails /> :
          <ProcessingDetails formData={formData} />}
      </FormContext.Provider>
    </div>
  );
}

export default App;
