import React from 'react';
import Results from '../Results';

const FCFS = ({ processes }) => {
  const calculateFCFS = (processes) => {
    let currentTime = 0;
    let waitingTimes = {};
    let turnAroundTimes = {};
    let order = [];

    processes.forEach((process) => {
      if (currentTime < process.arrivalTime) {
        currentTime = process.arrivalTime;
      }
      order.push(process.id);
      waitingTimes[process.id] = currentTime - process.arrivalTime;
      currentTime += process.burstTime;
      turnAroundTimes[process.id] = waitingTimes[process.id] + process.burstTime;
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

  const compressOrder = (order) => {
    let compressedOrder = [];
    for (let i = 0; i < order.length; i++) {
      if (i === 0 || order[i] !== order[i - 1]) {
        compressedOrder.push(order[i]);
      }
    }
    return compressedOrder;
  };

  const result = calculateFCFS(processes);
  result.order = compressOrder(result.order);

  return <Results result={result} algorithm="First Come First Serve (FCFS)" />;
};

export default FCFS;
