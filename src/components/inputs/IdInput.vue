<template>
  <el-input
      class="id-input"
      placeholder="Please input"
      :value="inputValue"
      @input="onChangeInput"
      clearable>
  </el-input>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class IdInput extends Vue {
  @Prop({default: () => ''}) private readonly inputValue: string;

  onChangeInput(value: string) {
    if (this.inputValue.length >= 50) {
      return;
    }

    this.$emit("onChangeInput", value);
  }

}
</script>
<style>
</style>

