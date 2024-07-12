import  { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import FCFS from './components/Algorithms/FCFS';
import SJF from './components/Algorithms/SJF';
import Priority from './components/Algorithms/Priority';
import RoundRobin from './components/Algorithms/RoundRobin';

function App() {
  const [processes, setProcesses] = useState([]);
  const [quantum, setQuantum] = useState(1);

  return (
    <div className="App p-6 bg-gray-100 min-h-screen ">
      <h1 className="text-2xl font-bold mb-4">مقارنة خوارزميات الجدولة</h1>
      <InputForm processes={processes} setProcesses={setProcesses} setQuantum={setQuantum} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className='bg-white p-6 shadow-xl text-right'>
          <FCFS processes={processes} />
        </div>
        <div className='bg-white p-6 shadow-xl text-right'>
          <SJF processes={processes} />
        </div>
        <div className='bg-white p-6 shadow-xl text-right'>
          <Priority processes={processes} />
        </div>
        <div className='bg-white p-6 shadow-xl text-right'>
          <RoundRobin processes={processes} quantum={quantum} />
        </div>
      </div>
    </div>
  );
}

export default App;
