<template>
  <div>
    <el-select :value="curItem" @change="onChange">
      <el-option v-for="it of itemList"
                 :key="it.key"
                 :label="it.label"
                 :value="it.value"></el-option>
    </el-select>
  </div>
</template>
<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class DialogueSelector extends Vue {
  @Prop({default: () => ''}) private readonly curItem: any;
  @Prop({default: () => []}) private readonly itemList: any[];

  onChange(val: any) {
    this.$emit('onChange', val)
  }
}
</script>