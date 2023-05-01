<template>
  <span
    class="chart__bar d-block position-absolute bottom-0 border-white border-2 border-start border-end"
    v-for="(val, index) in array"
    :key="`bar-${index}`"
    :style="{
      width: `calc(${100 / elementLength}% - 2px)`,
      height: `${(100 / elementLength) * val}%`,
      left: `${(100 / elementLength) * index}%`
    }"
  ></span>
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
    background-color: #129eba;
  }
}
</style>
