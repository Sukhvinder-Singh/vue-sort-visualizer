<template>
  <div
    class="chart__bar d-block position-absolute bottom-0 border-white border-2 border-start border-end"
    v-for="(val, index) in array"
    :key="`bar-${index}`"
    :style="{
      width: `calc(${100 / elementLength}% - 2px)`,
      height: `${(100 / elementLength) * val}%`,
      left: `${(100 / elementLength) * index}%`
    }"
  >
    <span
      class="chart__bubble position-absolute start-50 top-0 p-1 bg-danger text-white rounded-circle d-flex flex-row align-items-center justify-content-center"
      ><strong>{{ val }}</strong></span
    >
  </div>
</template>

<script setup>
defineProps({
  array: {
    type: Array,
    default: () => []
  },
  elementLength: {
    type: Number,
    default: () => 0
  }
});
</script>

<style lang="scss">
.chart {
  &__bar {
    background-color: #00b4d8;
  }

  &__bubble {
    font-size: 0.75rem;
    transform: translate(-50%, -100%);
    width: 24px;
    height: 24px;
  }
}
</style>
