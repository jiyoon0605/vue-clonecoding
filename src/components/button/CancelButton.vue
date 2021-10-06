<template>
  <span>
    <el-button type="danger" @click="onClick" plain>Cancel</el-button>
  </span>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class CancelButton extends Vue {
  onClick() {
    this.$emit('onClick')
  }
}
</script>