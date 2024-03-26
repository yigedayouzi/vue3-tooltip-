<template>
  <div class="page">
    <div v-for="item in fileList" v-Tooltip.mode1="item.name" class="item">
      {{ item.name }}
    </div>
    <div v-for="item in fileList2" v-Tooltip.mode2="item.name" class="item">
      {{ item.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { vTooltip } from "./components/toolTip/toolTip";

const fileList = ref([
  { id: 1, name: "一天两夜只吃了三顿饭" },
  { id: 2, name: "求下联" },
  { id: 3, name: "七荤八素还喝了九瓶酒" },
  { id: 4, name: "求横批" },
  { id: 5, name: "十分难受" },
]);
const fileList2 = ref([
  { id: 1, name: "2727teg" },
  { id: 2, name: "78657twrw" },
  { id: 3, name: "3278wssssssssssssssssssssssssssssrfrf" },
  { id: 4, name: "fsreg74" },
  { id: 5, name: "fewferg54" },
]);
</script>
<style scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #0b0c0e;
}
.item {
  background-color: #ecaeae;
}
</style>
