<template>
  <!--移动组件让组件可以不被遮挡-->
  <Teleport to="body">
    <!--容器，用于设置位置-->
    <div
      class="tooltipBox"
      ref="tooltipRef"
      :style="{
        display: tooltipDisplay,
        left: `${posleft}px`,
        top: `${posTop}px`,
      }"
    >
      <!--动态组件，根据mode的值来判断显示哪个组件-->
      <component :is="tooltipComponent" :text="text" />
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { text, finalLeft, finalTop, tooltipDisplay, mode } from "./toolTip";
import { ref, computed, onMounted, watch, nextTick } from "vue";

// 引入组件，新增的组件在这里引入
import myToolTipOne from "./myToolTipOne.vue";
import myToolTipTwo from "./myToolTipTwo.vue";

const tooltipComponent = computed(() => {
  if (mode.value === 1) {
    return myToolTipOne;
  } else {
    return myToolTipTwo;
  }
});
//获取dom
const tooltipRef = ref<HTMLElement>();

// 存储容器的宽度和高度
const divWidth = ref<number>();
const divHeight = ref<number>();

// 计算视窗的宽度和高度
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// 计算位置
const posleft = computed(() => {
  if (divWidth && finalLeft && divWidth.value && finalLeft.value) {
    if (finalLeft.value + divWidth.value > windowWidth) {
      return windowWidth - divWidth.value - 8; // 调整left值，使其不超出右边界
    } else {
      return finalLeft.value;
    }
  }
});
const posTop = computed(() => {
  if (divHeight && finalTop && divHeight.value && finalTop.value) {
    if (finalTop.value + divHeight.value > windowHeight) {
      return windowHeight - divHeight.value - 8; // 调整top值，使其不超出下边界
    } else {
      return finalTop.value;
    }
  }
});

onMounted(() => {
  // 获取容器的宽度和高度
  if (tooltipRef.value) {
    divHeight.value = tooltipRef.value.offsetHeight;
    divWidth.value = tooltipRef.value.offsetWidth;
  }
});

watch(text, () => {
  // 监听text的变化，当text变化时，重新获取容器的宽度和高度
  nextTick(() => {
    if (tooltipRef.value) {
      divHeight.value = tooltipRef.value.offsetHeight;
      divWidth.value = tooltipRef.value.offsetWidth;
    }
  });
});
</script>
<style scoped>
.tooltipBox {
  position: absolute;
  width: auto;
  height: auto;
}
</style>
```
