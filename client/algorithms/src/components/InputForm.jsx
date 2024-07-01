import React, { useState } from 'react';

const InputForm = ({ processes, setProcesses, setQuantum }) => {
  const [quantum, updateQuantum] = useState(1);

  const addProcess = () => {
    setProcesses([...processes, { id: `P${processes.length + 1}`, arrivalTime: 0, burstTime: 0, priority: 0 }]);
  };

  const updateProcess = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = value;
    setProcesses(newProcesses);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">إدخال العمليات</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">معرف العملية</th>
            <th className="py-2 px-4 border">زمن الوصول</th>
            <th className="py-2 px-4 border">زمن العملية</th>
            <th className="py-2 px-4 border">الأولوية</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process, index) => (
            <tr key={process.id}>
              <td className="py-2 px-4 border">{process.id}</td>
              <td className="py-2 px-4 border">
                <input
                  type="number"
                  value={process.arrivalTime}
                  onChange={(e) => updateProcess(index, 'arrivalTime', parseInt(e.target.value))}
                  className="w-full"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="number"
                  value={process.burstTime}
                  onChange={(e) => updateProcess(index, 'burstTime', parseInt(e.target.value))}
                  className="w-full"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="number"
                  value={process.priority}
                  onChange={(e) => updateProcess(index, 'priority', parseInt(e.target.value))}
                  className="w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addProcess} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        إضافة عملية
      </button>
      <div className="mt-4">
        <label className="block text-lg font-semibold mb-2">زمن التبادل (Quantum):</label>
        <input
          type="number"
          value={quantum}
          onChange={(e) => {
            updateQuantum(parseInt(e.target.value));
            setQuantum(parseInt(e.target.value));
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default InputForm;
