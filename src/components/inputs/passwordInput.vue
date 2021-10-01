<template>
  <el-input
      class="id-input"
      placeholder="Please input"
      :value="inputValue"
      @input="onChangeInput"
      show-password>
  </el-input>
</template>
<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class PasswordInput extends Vue {
  @Prop({default: () => ''}) private readonly inputValue: string;

  onChangeInput(value: string) {
    this.$emit("onChangeIdInput", value);
  }
}
</script>