<template>
  <div class="warning-message-container" :class="{invisible:!visible}">
    <span class="warning-message">{{ message }}</span>
    <el-button class="warning-closeBtn" type="danger" icon="el-icon-close" @click="onCloseWarningMessage"></el-button>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class WarningMessage extends Vue {
  @Prop() private readonly keyName: any;
  @Prop() private readonly visible: boolean | undefined;
  @Prop() private readonly message: string | undefined;

  onCloseWarningMessage() {
    this.$emit("onCloseWarningMessage", this.keyName);
  }
}
</script>
<style>

.warning-message-container {
  margin-top: 10px;
  height: 20px;
  width: 100%;
}

.warning-message {
  color: #F56C6C;
  padding: 10px;
  height: 100%;
}

.invisible {
  visibility: hidden;
}

.warning-closeBtn {
  height: 100%;
  width: 20px;
  border: none;
  background-color: white !important;
  color: #F56C6C !important;
  padding: 0 !important;

}

</style>