/**
 *
 * Sort array using selection sort algorithm
 *
 * @param {Array<number>} array - Array to sort
 * @param {Promise} promise - Promise object for delay
 * @param {HTMLElement} chartContainer - Chart container element
 * @param {number} interval - Array swap interval
 * @param {Function} playSound - Play sound function
 */
export const selectionSort = (array, promise, chartContainer, interval, playSound) => {
  let n = array.length;

  for (let i = 0; i < n; i++) {
    promise = promise.then(() => {
      let minNumberIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minNumberIndex]) {
          minNumberIndex = j;
        }
      }

      if (minNumberIndex != i) {
        let temp = array[i];
        array[i] = array[minNumberIndex];
        array[minNumberIndex] = temp;
      }

      playSound(array[i] * 50, 10);

      return new Promise((resolve) => {
        setTimeout(resolve, interval);
      });
    });
  }
};
