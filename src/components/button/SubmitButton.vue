<template>
  <div>
    <el-form-item>
      <el-button @click="onSubmit" v-text="message"></el-button>
    </el-form-item>
  </div>
</template>
<script lang="ts">


import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class SubmitButton extends Vue {
  @Prop({default: () => ""}) private readonly message: string;

  onSubmit() {
    this.$emit("onSubmit");
  }
}
</script>