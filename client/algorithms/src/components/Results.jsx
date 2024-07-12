// import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ result, algorithm }) => {
  if (!result || !result.order) {
    return <div>No results to display.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">نتائج الخوارزمية: {algorithm}</h2>
      <div>
        <strong>ترتيب العمليات:</strong>
        <p>{result.order.join(' -> ')}</p>
      </div>
      <div>
        <strong>زمن الانتظار لكل عملية:</strong>
        {Object.entries(result.waitingTimes).map(([process, time]) => (
          <p key={process}>{process}: {time}</p>
        ))}
      </div>
      <div>
        <strong>زمن الإكمال لكل عملية:</strong>
        {Object.entries(result.turnAroundTimes).map(([process, time]) => (
          <p key={process}>{process}: {time}</p>
        ))}
      </div>
      <div>
        <strong>متوسط زمن الانتظار:</strong>
        <p>{result.averageWaitingTime.toFixed(2)}</p>
      </div>
      <div>
        <strong>متوسط زمن الإكمال:</strong>
        <p>{result.averageTurnAroundTime.toFixed(2)}</p>
      </div>
    </div>
  );
};

Results.propTypes = {
  result: PropTypes.shape({
    order: PropTypes.arrayOf(PropTypes.string).isRequired,
    waitingTimes: PropTypes.objectOf(PropTypes.number).isRequired,
    turnAroundTimes: PropTypes.objectOf(PropTypes.number).isRequired,
    averageWaitingTime: PropTypes.number.isRequired,
    averageTurnAroundTime: PropTypes.number.isRequired,
  }),
  algorithm: PropTypes.string.isRequired,
};

export default Results;
