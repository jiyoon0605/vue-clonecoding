<template>
  <span class="warning-message" :class="{invisible:!visible}">{{ message }}</span>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class WarningMessage extends Vue {
  @Prop() visible: boolean;
  @Prop() message: string;
}
</script>
<style>
.warning-message {
  color: #F56C6C;
  padding: 10px;
  height: 20px;
}

.invisible {
  visibility: hidden;
}
</style>