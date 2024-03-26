<template>
  <div class="tooltip">
    <text>{{ text }}</text>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "tooltip",
  },
});

const text = computed(() => props.text);
</script>
<style scoped>
.tooltip {
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b1010ba;
  color: #ff0000;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  /* transition: all 0.3s; */
}
</style>
