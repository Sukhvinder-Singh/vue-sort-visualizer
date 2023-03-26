<template>
  <button @click="bubbleSort(array)">Start</button>
  <div class="chart">
    <span
      class="chart__bar"
      v-for="(val, index) in array"
      :style="{
        width: `calc(${array.length / 100}% - 2px)`,
        height: `${val}%`,
        left: `${(array.length / 100) * index}%`
      }"
    ></span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const array = ref(
  Array(100)
    .fill()
    .map(() => Math.round(Math.random() * 100))
)

const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
    }, duration);
}

const interval = 25
let promise = Promise.resolve()

function bubbleSort(array) {
  for (let i = 0; i <= array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      promise = promise.then(() => {
        if (array[j] > array[j + 1]) {
          let temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          playNote(array[j]*50, 10)
        }
        return new Promise((resolve) => {
          setTimeout(resolve, interval)
        })
      })
    }
  }
}

</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 600px;
  position: relative;

  &__bar {
    position: absolute;
    bottom: 0;
    display: block;
    background-color: rgb(0, 89, 255);
    border: 1px solid #fff;
  }
}
</style>
