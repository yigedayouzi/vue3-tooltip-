import { createApp, ref } from "vue";
import myToolTip from "./myToolTipIndex.vue";

//tooltip是否显示
export const tooltipDisplay = ref("none");

//给myToolTip组件传递text
export const text = ref<string>("");

//给myToolTip组件传递位置
export const finalLeft = ref<number>(0);
export const finalTop = ref<number>(0);

//选择组件，默认为1号组件
export const mode = ref<number>(1);

// 创建一个全局div容器用于显示文本
const tooltipDiv = document.createElement("div");
// 将全局div元素添加到body中
document.body.appendChild(tooltipDiv);

// 创建一个全局变量用于存储myToolTip实例
let tooltipApp: any;

// 实现指令 v-my-tooltip
export const vTooltip = {
  //el：指令绑定到的元素。这可以用于直接操作 DOM。binding：一个对象，包含value, oldValue, arg, modifiers等属性。
  mounted(el: any, binding: any) {
    // 显示tooltip
    const showTooltip = (event: any) => {
      //获取元素的绑定的文本内容
      text.value = binding.value;

      // 获取元素的文本内容
      // text.value=el.innerText;

      // 显示
      tooltipDisplay.value = "block";

      // 判断是否有修饰符
      if (binding.modifiers.mode1) {
        mode.value = 1;
      } else if (binding.modifiers.mode2) {
        mode.value = 2;
      }

      // 如果已有实例则更新数据，否则创建实例
      if (tooltipApp) {
        // 已有实例则直接更新text
        text.value = binding.value;
      } else {
        // 没有实例则创建并挂载
        tooltipApp = createApp(myToolTip);
        tooltipApp.mount(tooltipDiv);
      }
      // 设置位置不遮挡
      finalLeft.value = event.clientX + 10;
      finalTop.value = event.clientY + 15;
    };

    // 鼠标移出时隐藏tooltip
    const hideTooltip = () => {
      tooltipDisplay.value = "none";
    };

    // 添加事件监听器
    el.addEventListener("mouseenter", showTooltip);
    el.addEventListener("mousemove", showTooltip);
    el.addEventListener("mouseleave", hideTooltip);
  },

  unmounted(el: any) {
    // 移除事件监听器
    el.removeEventListener("mouseenter", el._showTooltip);
    el.removeEventListener("mousemove", el._showTooltip);
    el.removeEventListener("mouseleave", el._hideTooltip);
    // 卸载实例
    tooltipApp.unmount();
    // 移除全局div
    tooltipDiv.remove();
  },
};
