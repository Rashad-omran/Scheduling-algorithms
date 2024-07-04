import React from 'react';
import Results from '../Results';

const RoundRobin = ({ processes, quantum }) => {
  const calculateRoundRobin = (processes, quantum) => {
    let n = processes.length;
    let currentTime = 0;
    let queue = [];
    let waitingTimes = {};
    let turnAroundTimes = {};
    let remainingTimes = {};
    let order = [];

    processes.forEach(process => {
      remainingTimes[process.id] = process.burstTime;
      waitingTimes[process.id] = 0;
      turnAroundTimes[process.id] = 0;
    });

    queue.push(...processes);

    while (queue.length > 0) {
      let process = queue.shift();
      if (remainingTimes[process.id] > 0) {
        order.push(process.id);
        let timeSlice = Math.min(quantum, remainingTimes[process.id]);
        currentTime += timeSlice;
        remainingTimes[process.id] -= timeSlice;

        if (remainingTimes[process.id] > 0) {
          queue.push(process);
        } else {
          turnAroundTimes[process.id] = currentTime - process.arrivalTime;
          waitingTimes[process.id] = turnAroundTimes[process.id] - process.burstTime;
        }
      }
    }

    let averageWaitingTime = Object.values(waitingTimes).reduce((a, b) => a + b, 0) / n;
    let averageTurnAroundTime = Object.values(turnAroundTimes).reduce((a, b) => a + b, 0) / n;

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

  const result = calculateRoundRobin(processes, quantum);
  result.order = compressOrder(result.order);

  return <Results result={result} algorithm="Round Robin" />;
};

export default RoundRobin;
