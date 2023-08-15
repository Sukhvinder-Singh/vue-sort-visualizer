import { fillSortedArray } from './fill-sorted-array';
import { COLORS } from './colors';

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
export const mergeSort = async (array, delay, chartContainer, interval, playSound) => {
  let result = array;
  let len = result.length;

  let buffer = [];

  for (let size = 1; size < len; size *= 2) {
    for (let leftStart = 0; leftStart < len; leftStart += 2 * size) {
      let left = leftStart;

      let right = Math.min(left + size, len);

      let leftLimit = right;
      let rightLimit = Math.min(right + size, len);
      let i = left;

      for (let k = leftStart; k < rightLimit; k++) {
        chartContainer.querySelector(`.chart__bar:nth-of-type(${k + 1})`).style.backgroundColor =
          COLORS.current;
      }

      while (left < leftLimit && right < rightLimit) {
        playSound(array[left] * 50, 10);
        playSound(array[right] * 50, 10);

        chartContainer.querySelector(`.chart__bar:nth-of-type(${left + 1})`).style.backgroundColor =
          COLORS.compare;
        chartContainer.querySelector(
          `.chart__bar:nth-of-type(${right + 1})`
        ).style.backgroundColor = COLORS.compare;

        if (result[left] <= result[right]) {
          buffer[i] = result[left];
          left++;
          i++;
        } else {
          buffer[i] = result[right];
          right++;
          i++;
        }

        await delay(interval);
      }

      for (let k = leftStart; k < rightLimit; k++) {
        chartContainer.querySelector(`.chart__bar:nth-of-type(${k + 1})`).style.backgroundColor =
          COLORS.unsorted;
      }

      while (left < leftLimit) {
        playSound(array[i] * 50, 10);

        buffer[i] = result[left];
        left++;
        i++;

        chartContainer.querySelector(`.chart__bar:nth-of-type(${i})`).style.backgroundColor =
          COLORS.current;

        await delay(interval);
      }

      while (right < rightLimit) {
        playSound(array[i] * 50, 10);

        buffer[i] = result[right];
        right++;
        i++;

        chartContainer.querySelector(`.chart__bar:nth-of-type(${i})`).style.backgroundColor =
          COLORS.current;

        await delay(interval);
      }

      for (let k = leftStart; k < rightLimit; k++) {
        chartContainer.querySelector(`.chart__bar:nth-of-type(${k + 1})`).style.backgroundColor =
          COLORS.sorted;

        playSound(array[k] * 50, 10);

        await delay(1);
      }
    }

    let temp = result;
    result = buffer;
    buffer = temp;

    await delay(interval);
  }

  for (let i = 0; i < len; i++) {
    array[i] = result[i];
    playSound(array[i] * 50, 10);

    chartContainer.querySelector(`.chart__bar:nth-of-type(${i + 1})`).style.backgroundColor =
      COLORS.sorted;

    await delay(interval);
  }

  fillSortedArray(array, delay, chartContainer, playSound);
};
