import React from 'react';
import Results from '../Results';

const Priority = ({ processes }) => {
  const calculatePriority = (processes) => {
    let n = processes.length;
    let currentTime = 0;
    let completed = 0;
    let waitingTimes = {};
    let turnAroundTimes = {};
    let isCompleted = Array(n).fill(false);
    let order = [];

    for (let i = 0; i < n; i++) {
      waitingTimes[processes[i].id] = 0;
      turnAroundTimes[processes[i].id] = 0;
    }

    while (completed !== n) {
      let idx = -1;
      let highestPriority = Number.MAX_VALUE;

      for (let i = 0; i < n; i++) {
        if (processes[i].arrivalTime <= currentTime && !isCompleted[i]) {
          if (processes[i].priority < highestPriority) {
            highestPriority = processes[i].priority;
            idx = i;
          }
          if (processes[i].priority === highestPriority) {
            if (processes[i].arrivalTime < processes[idx].arrivalTime) {
              idx = i;
            }
          }
        }
      }

      if (idx !== -1) {
        order.push(processes[idx].id);
        currentTime += processes[idx].burstTime;
        turnAroundTimes[processes[idx].id] = currentTime - processes[idx].arrivalTime;
        waitingTimes[processes[idx].id] = turnAroundTimes[processes[idx].id] - processes[idx].burstTime;
        isCompleted[idx] = true;
        completed++;
      } else {
        currentTime++;
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

  const result = calculatePriority(processes);
  result.order = compressOrder(result.order);

  return <Results result={result} algorithm="Priority Scheduling" />;
};

export default Priority;
