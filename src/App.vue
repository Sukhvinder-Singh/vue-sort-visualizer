<template>
  <div class="settings">
    <h1>Vue sort visualizer</h1>
    <hr />
    <button @click="bubbleSort(array)">Start</button>
  </div>
  <div class="chart" ref="chartContainer">
    <span
      class="chart__bar"
      v-for="(val, index) in array"
      :key="`bar-${index}`"
      :style="{
        width: `calc(${100 / elementLength}% - 2px)`,
        height: `${(100 / elementLength) * val}%`,
        left: `${(100 / elementLength) * index}%`
      }"
    ></span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chartContainer = ref(null)
const elementLength = 100
const interval = 10

const array = ref([])

for (let i = 0; i < elementLength; i++) {
  array.value.push(i + 1)
}

for (let i = array.value.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[array.value[i], array.value[j]] = [array.value[j], array.value[i]]
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

function playFrequency(frequency, duration) {
  const oscillator = audioCtx.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.value = frequency // value in hertz
  oscillator.connect(audioCtx.destination)
  oscillator.start()
  setTimeout(function () {
    oscillator.stop()
  }, duration)
}

let promise = Promise.resolve()

function bubbleSort(array) {
  for (let i = 0; i <= array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      promise = promise.then(() => {
        if (array[j] > array[j + 1]) {
          let temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          playFrequency(array[j] * 50, 10)
        }

        chartContainer.value.querySelector(
          `.chart__bar:nth-of-type(${j + 2})`
        ).style.backgroundColor = 'red'

        chartContainer.value.querySelector(
          `.chart__bar:nth-of-type(${j + 1})`
        ).style.backgroundColor = 'blue'

        return new Promise((resolve) => {
          setTimeout(resolve, interval)
        })
      })
    }
  }

  for (let i = 0; i < array.length; i++) {
    promise = promise.then(() => {
      chartContainer.value.querySelector(
        `.chart__bar:nth-of-type(${i + 1})`
      ).style.backgroundColor = 'green'
      playFrequency(array[i] * 50, 10)
      return new Promise((resolve) => {
        setTimeout(resolve, interval)
      })
    })
  }
}
</script>

<style lang="scss">
@use '../node_modules/bootstrap/scss/bootstrap';

.chart {
  width: 100%;
  height: 400px;
  position: relative;

  &__bar {
    position: absolute;
    bottom: 0;
    display: block;
    background-color: blue;
    border: 1px solid #fff;
  }
}
</style>
