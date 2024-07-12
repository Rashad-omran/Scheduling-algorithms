import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Results from '../Results';

const FCFS = ({ processes }) => {
  const [result, setResult] = useState({});

  useEffect(() => {
    let isMounted = true;

    const calculateFCFS = (processes) => {
      let currentTime = 0;
      let waitingTimes = {};
      let turnAroundTimes = {};
      let order = [];

      processes.forEach((process) => {
        order.push(process.id);
        if (currentTime < process.arrivalTime) {
          currentTime = process.arrivalTime;
        }
        waitingTimes[process.id] = currentTime - process.arrivalTime;
        currentTime += process.burstTime;
        turnAroundTimes[process.id] = currentTime - process.arrivalTime;
      });

      let averageWaitingTime = Object.values(waitingTimes).reduce((a, b) => a + b, 0) / processes.length;
      let averageTurnAroundTime = Object.values(turnAroundTimes).reduce((a, b) => a + b, 0) / processes.length;

      return {
        order,
        waitingTimes,
        turnAroundTimes,
        averageWaitingTime,
        averageTurnAroundTime,
      };
    };

    if (isMounted) {
      setResult(calculateFCFS(processes));
    }

    return () => {
      isMounted = false;
    };
  }, [processes]);

  return <Results result={result} algorithm="First Come First Serve (FCFS)" />;
};

FCFS.propTypes = {
  processes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      arrivalTime: PropTypes.number.isRequired,
      burstTime: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FCFS;
