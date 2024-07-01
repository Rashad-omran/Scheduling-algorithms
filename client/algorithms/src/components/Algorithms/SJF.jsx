import React from 'react';
import Results from '../Results';

const SJF = ({ processes, preemptive }) => {
  console.log('Processes:', processes);  // تحقق من العمليات هنا

  const calculateNonPreemptiveSJF = (processes) => {
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
      let minBurstTime = Number.MAX_VALUE;

      for (let i = 0; i < n; i++) {
        if (processes[i].arrivalTime <= currentTime && !isCompleted[i]) {
          if (processes[i].burstTime < minBurstTime) {
            minBurstTime = processes[i].burstTime;
            idx = i;
          }
          if (processes[i].burstTime === minBurstTime) {
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

  const calculatePreemptiveSJF = (processes) => {
    let n = processes.length;
    let currentTime = 0;
    let completed = 0;
    let minBurstTime = Number.MAX_VALUE;
    let shortest = 0;
    let check = false;
    let waitingTimes = {};
    let turnAroundTimes = {};
    let remainingTimes = {};
    let order = [];

    processes.forEach(process => {
      remainingTimes[process.id] = process.burstTime;
      waitingTimes[process.id] = 0;
      turnAroundTimes[process.id] = 0;
    });

    while (completed !== n) {
      for (let i = 0; i < n; i++) {
        if ((processes[i].arrivalTime <= currentTime) && (remainingTimes[processes[i].id] < minBurstTime) && remainingTimes[processes[i].id] > 0) {
          minBurstTime = remainingTimes[processes[i].id];
          shortest = i;
          check = true;
        }
      }

      if (!check) {
        currentTime++;
        continue;
      }

      remainingTimes[processes[shortest].id]--;
      order.push(processes[shortest].id);

      minBurstTime = remainingTimes[processes[shortest].id];
      if (minBurstTime === 0) {
        minBurstTime = Number.MAX_VALUE;
      }

      if (remainingTimes[processes[shortest].id] === 0) {
        completed++;
        check = false;
        let finishTime = currentTime + 1;
        waitingTimes[processes[shortest].id] = finishTime - processes[shortest].burstTime - processes[shortest].arrivalTime;

        if (waitingTimes[processes[shortest].id] < 0) {
          waitingTimes[processes[shortest].id] = 0;
        }

        turnAroundTimes[processes[shortest].id] = finishTime - processes[shortest].arrivalTime;
      }

      currentTime++;
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

  const result = preemptive ? calculatePreemptiveSJF(processes) : calculateNonPreemptiveSJF(processes);
  result.order = compressOrder(result.order);

  return <Results result={result} algorithm={`Shortest Job First (${preemptive ? 'Preemptive' : 'Non-Preemptive'})`} />;
};

export default SJF;
