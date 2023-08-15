<template>
  <div
    class="chart__bar d-block position-absolute bottom-0"
    :class="{ 'border-white border-2 border-start border-end': elementLength <= MAX_LENGTH }"
    v-for="(val, index) in array"
    :key="`bar-${index}`"
    :style="{
      width: `calc(${100 / elementLength}% - ${chartBarGap}px)`,
      height: `${(100 / elementLength) * val}%`,
      left: `${(100 / elementLength) * index}%`
    }"
  >
    <span
      class="chart__bubble position-absolute text-black d-flex flex-row align-items-center justify-content-center"
      :class="{ 'chart__bubble--small': elementLength > MAX_LENGTH }"
      ><strong>{{ val }}</strong></span
    >
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  array: {
    type: Array,
    default: () => []
  },
  elementLength: {
    type: Number,
    default: () => 0
  }
});

const MAX_LENGTH = 180;

const chartBarGap = computed(() => {
  if (props.elementLength > MAX_LENGTH) return 0;
  return 2;
});
</script>

<style lang="scss">
.chart {
  &__bar {
    background-color: #00b4d8;
  }

  &__bubble {
    font-size: 1rem;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
    width: 24px;
    height: 24px;
    padding: 1rem;

    &--small {
      font-size: 0.375rem;
      width: auto;
      padding: 0;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }
  }
}
</style>
