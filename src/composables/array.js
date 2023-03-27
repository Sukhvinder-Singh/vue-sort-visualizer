/**
 *
 * @param {Array} array
 * @param {number} length
 */
export const fillArray = (array, length) => {
  for (let i = 0; i < length; i++) {
    array.push(i + 1);
  }
};

/**
 *
 * @param {Array} array
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
