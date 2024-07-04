import React, { useEffect, useState } from 'react';
import Results from '../Results';

const FCFS = ({ processes }) => {
  const [result, setResult] = useState({});

  useEffect(() => {
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

    setResult(calculateFCFS(processes));
  }, [processes]);

  return <Results result={result} algorithm="First Come First Serve (FCFS)" />;
};

export default FCFS;
