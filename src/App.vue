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
      <div class="form-floating position-relative">
        <label for="select_algorithm" class="py-0">
          <em class="text-muted">Select algorithm</em>
        </label>
        <select
          id="select_algorithm"
          class="btn position-relative border-primary pt-4 pe-5"
          v-model="selectedAlgorithm"
        >
          <option
            v-for="(algorithm, index) in algorithmList"
            :key="`algo--${index}`"
            :value="algorithm"
          >
            {{ algorithm.name }}
          </option>
        </select>
      </div>
      <button
        class="btn btn-primary"
        @click="
          selectedAlgorithm.algorithm(array, delay, chartContainer, interval, playSound);
          currentTime = 0;
          timerStore.isTimerRunning = true;
          historyStore.currentAlgorithm.algorithm = selectedAlgorithm.name;
          historyStore.currentAlgorithm.elapsedTime = 0;
        "
      >
        Start
      </button>
      <button
        class="btn btn-primary"
        @click="reshuffleArray(array, chartContainer)"
        :disabled="timerStore.isTimerRunning"
      >
        Randomize
      </button>
    </div>
    <hr />
    <div class="row">
      <p class="mb-0 text-center lead">
        Elapsed time: <strong>{{ (currentTime / 1000).toPrecision(5) }}s</strong>
      </p>
    </div>
  </div>
  <div
    class="chart w-100 position-relative border-2 border-bottom border-dark mt-5"
    ref="chartContainer"
  >
    <ChartBar :array="array" :element-length="elementLength" />
  </div>
  <hr />
  <div>
    <h2>History</h2>
    {{ historyStore.history }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { fillArray, shuffleArray, reshuffleArray } from './composables/array';
import { playSound } from './composables/sound';
import { bubbleSort } from './composables/bubble-sort';
import { selectionSort } from './composables/selection-sort';
import { mergeSort } from './composables/merge-sort';
import { useTimerStore, useHistoryStore } from './stores/store';
import { storeToRefs } from 'pinia';
import ChartBar from './components/ChartBar.vue';

const chartContainer = ref(null);
const elementLength = ref(20);
const interval = ref(10);

const array = ref([]);

const timerStore = useTimerStore();
const { currentTime } = storeToRefs(timerStore);

const historyStore = useHistoryStore();

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const algorithmList = [
  { name: 'Bubble sort', algorithm: bubbleSort },
  { name: 'Selection sort', algorithm: selectionSort },
  { name: 'Merge sort', algorithm: mergeSort }
];

const selectedAlgorithm = ref(algorithmList[0]);

fillArray(array.value, elementLength.value);
shuffleArray(array.value);

watch(elementLength, (updatedVal) => {
  array.value = [];
  fillArray(array.value, updatedVal);
  shuffleArray(array.value);
});

watch(currentTime, (newTime) => {
  historyStore.currentAlgorithm.elapsedTime = newTime;
});
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
