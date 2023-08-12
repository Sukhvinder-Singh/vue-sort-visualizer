export const fillSortedArray = async (array, delay, chartContainer, interval, playSound) => {
  for (let i = 0; i < array.length; i++) {
    chartContainer.querySelector(`.chart__bar:nth-of-type(${i + 1})`).style.backgroundColor =
      'green';
    playSound(array[i] * 50, 10);
    await delay(interval);
  }
};
