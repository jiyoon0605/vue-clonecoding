<template>
  <span>
    <i :class="iconName"></i>
    <span>
      {{ message }}
    </span>
  </span>
</template>
<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class IconText extends Vue {
  @Prop({default: () => ''}) iconName: string;
  @Prop({default: () => ''}) message: string;
}
</script>