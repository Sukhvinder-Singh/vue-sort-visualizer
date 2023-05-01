<template>
  <div class="settings mb-5">
    <h1>Vue sort visualizer</h1>
    <hr />
    <div class="d-flex flex-row align-items-center justify-content-start gap-3">
      <div class="form-floating">
        <input
          v-model="elementLength"
          type="number"
          class="form-control"
          id="element_length"
          placeholder="Number of elements"
        />
        <label for="element_length">Number of elements</label>
      </div>
      <div class="form-floating">
        <input
          v-model="interval"
          type="number"
          class="form-control"
          id="delay_interval"
          placeholder="Number of elements"
        />
        <label for="delay_interval">Delay between iterations</label>
      </div>
      <button class="btn btn-primary" @click="bubbleSort(array)">Start</button>
    </div>
  </div>
  <div class="chart" ref="chartContainer">
    <ChartBar :array="array" :element-length="elementLength" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { fillArray, shuffleArray } from './composables/array';
import { playSound } from './composables/sound';
import ChartBar from './components/ChartBar.vue';

const chartContainer = ref(null);
const elementLength = ref(20);
const interval = ref(10);

const array = ref([]);

fillArray(array.value, elementLength.value);
shuffleArray(array.value);

watch(elementLength, (updatedVal) => {
  array.value = [];
  fillArray(array.value, updatedVal);
  shuffleArray(array.value);
});

let promise = Promise.resolve();

function bubbleSort(array) {
  for (let i = 0; i <= array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      promise = promise.then(() => {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }

        playSound(array[j] * 50, 10);

        chartContainer.value.querySelector(
          `.chart__bar:nth-of-type(${j + 2})`
        ).style.backgroundColor = 'red';

        chartContainer.value.querySelector(
          `.chart__bar:nth-of-type(${j + 1})`
        ).style.backgroundColor = 'blue';

        return new Promise((resolve) => {
          setTimeout(resolve, interval.value);
        });
      });
    }
  }

  for (let i = 0; i < array.length; i++) {
    promise = promise.then(() => {
      chartContainer.value.querySelector(
        `.chart__bar:nth-of-type(${i + 1})`
      ).style.backgroundColor = 'green';
      playSound(array[i] * 50, 10);
      return new Promise((resolve) => {
        setTimeout(resolve, interval.value);
      });
    });
  }
}
</script>

<style lang="scss">
@use '../node_modules/bootstrap/scss/bootstrap';

body {
  padding: 1rem;
}

.chart {
  width: 100%;
  height: 400px;
  position: relative;
  border-bottom: 1px solid;

  &__bar {
    position: absolute;
    bottom: 0;
    display: block;
    background-color: #129EBA;
    border: solid #fff;
    border-width: 0 1px;
  }
}
</style>
