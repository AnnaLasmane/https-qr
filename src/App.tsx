import React, { useState } from 'react';
import './App.css';
import Button from '../src/components/buttons/Button';
import Qr from './components/qr/Qr';

function App() {
  const [total, setTotal] = useState<number>(0);

  return (
    <div>
     

      <h1 className={`header`}>{total}</h1>

      <Button label="add 5" onClick={() => setTotal(total + 5)} />
      <Button label="add 10" onClick={() => setTotal(total + 10)} />
      <Qr />
    </div>
  );
}

export default App;
