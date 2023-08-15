import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useTimerStore = defineStore('timer', () => {
  const isTimerRunning = ref(false);

  const startTime = ref(null);
  const currentTime = ref(0);
  const interval = ref(null);

  function startTimer() {
    currentTime.value = 0;
    startTime.value = new Date().getTime();
    interval.value = setInterval(() => {
      currentTime.value = new Date().getTime() - startTime.value;
    }, 1);
  }

  function stopTimer() {
    clearInterval(interval.value);
    interval.value = null;
    startTime.value = null;
  }

  watch(isTimerRunning, (isStillRunning) => {
    if (isStillRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  });

  return {
    isTimerRunning,
    currentTime
  };
});
