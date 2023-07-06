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
      <button
        class="btn btn-primary"
        @click="bubbleSort(array, promise, chartContainer, interval, playSound)"
      >
        Start
      </button>
    </div>
  </div>
  <div
    class="chart w-100 position-relative border-2 border-bottom border-dark mt-5"
    ref="chartContainer"
  >
    <ChartBar :array="array" :element-length="elementLength" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { fillArray, shuffleArray } from './composables/array';
import { playSound } from './composables/sound';
import { bubbleSort } from './composables/bubble-sort';
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
</script>

<style lang="scss">
@use '../node_modules/bootstrap/scss/bootstrap';

body {
  padding: 1rem;
}

.chart {
  height: 400px;
}
</style>
