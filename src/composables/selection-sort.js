import { fillSortedArray } from './fill-sorted-array';
import { COLORS } from './colors';

/**
 *
 * Sort array using selection sort algorithm
 *
 * @param {Array<number>} array - Array to sort
 * @param {Function} delay - Delay function callback
 * @param {HTMLElement} chartContainer - Chart container element
 * @param {number} interval - Array swap interval
 * @param {Function} playSound - Play sound function
 */
export const selectionSort = async (array, delay, chartContainer, interval, playSound) => {
  let n = array.length;

  for (let i = 0; i < n; i++) {
    let minNumberIndex = i;

    chartContainer.querySelector(`.chart__bar:nth-of-type(${i + 1})`).style.backgroundColor =
      COLORS.compare;

    for (let j = i + 1; j < n; j++) {
      chartContainer.querySelector(`.chart__bar:nth-of-type(${j + 1})`).style.backgroundColor =
        COLORS.current;

      if (array[j] < array[minNumberIndex]) {
        minNumberIndex = j;
      }

      playSound(array[j] * 50, 10);
      await delay(interval);

      chartContainer.querySelector(`.chart__bar:nth-of-type(${j + 1})`).style.backgroundColor =
        COLORS.unsorted;
    }

    if (minNumberIndex != i) {
      let temp = array[i];
      array[i] = array[minNumberIndex];
      array[minNumberIndex] = temp;
    }

    playSound(array[i] * 50, 10);

    for (let k = 0; k < i + 1; k++) {
      chartContainer.querySelector(`.chart__bar:nth-of-type(${k + 1})`).style.backgroundColor =
        COLORS.sorted;
    }
    await delay(interval);
  }

  fillSortedArray(array, delay, chartContainer, playSound);
};
