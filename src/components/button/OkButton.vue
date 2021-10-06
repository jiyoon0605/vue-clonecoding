<template>
  <span>
    <el-button type="primary" @click="onClick">Ok</el-button>
  </span>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class OkButton extends Vue {
  onClick() {
    this.$emit('onClick')
  }
}
</script>