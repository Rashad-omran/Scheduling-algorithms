import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import FCFS from './components/Algorithms/FCFS';
import SJF from './components/Algorithms/SJF';
import Priority from './components/Algorithms/Priority';
import RoundRobin from './components/Algorithms/RoundRobin';

function App() {
  const [processes, setProcesses] = useState([]);
  const [preemptive, setPreemptive] = useState(false);
  const [quantum, setQuantum] = useState(1);

  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">مقارنة خوارزميات الجدولة</h1>
      <InputForm processes={processes} setProcesses={setProcesses} setQuantum={setQuantum} />
      <div className="mt-4">
        <button
          className={`px-4 py-2 rounded mr-2 ${preemptive ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setPreemptive(true)}
        >
          القابلة للتوقف
        </button>
        <button
          className={`px-4 py-2 rounded ${!preemptive ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setPreemptive(false)}
        >
          غير القابلة للتوقف
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FCFS processes={processes} preemptive={preemptive} />
        </div>
        <div>
          <SJF processes={processes} preemptive={preemptive} />
        </div>
        <div>
          <Priority processes={processes} preemptive={preemptive} />
        </div>
        <div>
          <RoundRobin processes={processes} quantum={quantum} />
        </div>
      </div>
    </div>
  );
}

export default App;
