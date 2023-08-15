import { COLORS } from './colors';

/**
 *
 * Fill an array with values starting from 0 to any length in ascending order
 *
 * @param {Array} array - Array to fill with values from 0 to [length] in increasing order
 * @param {number} length - Length of array
 */
export const fillArray = (array, length) => {
  for (let i = 0; i < length; i++) {
    array.push(i + 1);
  }
};

/**
 *
 * Shuffle elements inside an array
 *
 * @param {Array} array - Array whose elements are to be shuffled
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/**
 *
 * Reshuffle Array
 *
 * @param {Array} array - Array to reshuffle
 * @param {HTMLElement} chartContainer - Chart container element
 */
export const reshuffleArray = (array, chartContainer) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  for (let i = 0; i < array.length; i++) {
    chartContainer.querySelector(`.chart__bar:nth-of-type(${i + 1})`).style.backgroundColor =
      COLORS.unsorted;
  }
};
