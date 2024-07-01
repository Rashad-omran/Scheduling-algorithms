import React from 'react';
import Results from '../Results';

const RoundRobin = ({ processes, quantum }) => {
  const calculateRoundRobin = (processes, quantum) => {
    let n = processes.length;
    let currentTime = 0;
    let waitingTimes = {};
    let turnAroundTimes = {};
    let remainingTimes = {};
    let order = [];
    let completed = 0;

    processes.forEach(process => {
      remainingTimes[process.id] = process.burstTime;
      waitingTimes[process.id] = 0;
      turnAroundTimes[process.id] = 0;
    });

    while (completed !== n) {
      let isAnyProcessExecuted = false;
      for (let i = 0; i < n; i++) {
        if (remainingTimes[processes[i].id] > 0) {
          isAnyProcessExecuted = true;
          if (remainingTimes[processes[i].id] > quantum) {
            currentTime += quantum;
            remainingTimes[processes[i].id] -= quantum;
            order.push(processes[i].id);
          } else {
            currentTime += remainingTimes[processes[i].id];
            waitingTimes[processes[i].id] = currentTime - processes[i].burstTime - processes[i].arrivalTime;
            if (waitingTimes[processes[i].id] < 0) waitingTimes[processes[i].id] = 0;
            turnAroundTimes[processes[i].id] = currentTime - processes[i].arrivalTime;
            remainingTimes[processes[i].id] = 0;
            completed++;
            order.push(processes[i].id);
          }
        }
      }
      if (!isAnyProcessExecuted) {
        break;
      }
    }

    let uniqueOrder = [...new Set(order)];
    let averageWaitingTime = Object.values(waitingTimes).reduce((a, b) => a + b, 0) / n;
    let averageTurnAroundTime = Object.values(turnAroundTimes).reduce((a, b) => a + b, 0) / n;

    return {
      order: uniqueOrder,
      waitingTimes,
      turnAroundTimes,
      averageWaitingTime,
      averageTurnAroundTime,
    };
  };

  const result = calculateRoundRobin(processes, quantum);

  return <Results result={result} algorithm="Round Robin" />;
};

export default RoundRobin;
