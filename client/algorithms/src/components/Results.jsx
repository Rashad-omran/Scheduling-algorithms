import React from 'react';

const Results = ({ result, algorithm }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">نتائج الخوارزمية: {algorithm}</h2>
      <div>
        <h3 className="text-lg font-medium">ترتيب العمليات:</h3>
        <p>{result.order.join(' -> ')}</p>
        <h3 className="text-lg font-medium">زمن الانتظار لكل عملية:</h3>
        <ul>
          {Object.entries(result.waitingTimes).map(([id, time]) => (
            <li key={id}>{id}: {time}</li>
          ))}
        </ul>
        <h3 className="text-lg font-medium">زمن الإكمال لكل عملية:</h3>
        <ul>
          {Object.entries(result.turnAroundTimes).map(([id, time]) => (
            <li key={id}>{id}: {time}</li>
          ))}
        </ul>
        <h3 className="text-lg font-medium">متوسط زمن الانتظار:</h3>
        <p>{result.averageWaitingTime}</p>
        <h3 className="text-lg font-medium">متوسط زمن الإكمال:</h3>
        <p>{result.averageTurnAroundTime}</p>
      </div>
    </div>
  );
};

export default Results;
