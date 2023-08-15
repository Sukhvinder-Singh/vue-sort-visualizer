import { COLORS } from './colors';
import { useTimerStore, useHistoryStore } from '../stores/store';

export const fillSortedArray = async (array, delay, chartContainer, playSound) => {
  const timerStore = useTimerStore();
  const historyStore = useHistoryStore();
  const lastAlgorithm = historyStore.currentAlgorithm;

  timerStore.isTimerRunning = false;
  historyStore.history.push({ ...lastAlgorithm });

  for (let i = 0; i < array.length; i++) {
    chartContainer.querySelector(`.chart__bar:nth-of-type(${i + 1})`).style.backgroundColor =
      COLORS.completed;
    playSound(array[i] * 50, 10);
    await delay(10);
  }
};
