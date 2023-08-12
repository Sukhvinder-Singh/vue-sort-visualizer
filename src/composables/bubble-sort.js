import { fillSortedArray } from './fill-sorted-array';

/**
 *
 * Sort array using bubble sort algorithm
 *
 * @param {Array<number>} array - Array to sort
 * @param {Function} delay - Delay function callback
 * @param {HTMLElement} chartContainer - Chart container element
 * @param {number} interval - Array swap interval
 * @param {Function} playSound - Play sound function
 */
export const bubbleSort = async (array, delay, chartContainer, interval, playSound) => {
  for (let i = 0; i <= array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }

      playSound(array[j] * 50, 10);

      chartContainer.querySelector(`.chart__bar:nth-of-type(${j + 2})`).style.backgroundColor =
        'red';
      chartContainer.querySelector(`.chart__bar:nth-of-type(${j + 1})`).style.backgroundColor =
        'blue';

      await delay(interval);
    }
    await delay(interval);
  }

  fillSortedArray(array, delay, chartContainer, playSound);
};
