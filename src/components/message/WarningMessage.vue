<template>
  <div :class="invisible">
    <el-tag type="danger">{{ message }}</el-tag>
  </div>

</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class WarningMessage extends Vue {
  @Prop({default: () => ''}) private readonly message: string;
  @Prop({default: () => false}) private readonly visible: boolean;

  get invisible() {
    return {invisible: !this.visible}
  }
}


</script>
<style>
.invisible {
  visibility: hidden;
}
</style>