const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/**
 *
 * Play a sound wave of a certain frequency for some time
 *
 * @param {number} frequency - Frequency in Hz of the sound wave
 * @param {number} duration - Duration of sound play in milliseconds
 * @param {string} [type=sine] - Type of the sound wave. Default 'sine'
 */
export const playSound = (frequency, duration, type = 'sine') => {
  const oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, duration);
};
