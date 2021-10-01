<template>
  <div class="warning-message-container">
    <div class="warning-message-box" :class="invisibleClassName">
      <div v-if="closed" class="closed-message-box">
        Warning Message is closed
      </div>
      <div v-else>
        <span class="warning-message">{{ message }}</span>
        <el-button class="warning-closeBtn" type="danger" icon="el-icon-close" @click="closeWarningMessage"></el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {WarningMessageData} from '@/models/SignupModel';

@Component
export default class WarningMessage extends Vue {
  @Prop({
          default: {
            visible: false,
            keyName: '',
            message: '',
            closed: false
          }
        }) private readonly warningMessageData: WarningMessageData;


  get visible(): boolean {
    return this.warningMessageData.visible;
  }

  get message(): string {
    return this.warningMessageData.message;
  }

  get keyName(): string {
    return this.warningMessageData.keyName;
  }

  get closed(): boolean {
    return this.warningMessageData.closed;
  }

  get invisibleClassName(): object {
    return {invisible: !this.visible}
  }

  closeWarningMessage() {
    this.$emit("closeWarningMessage", this.keyName);
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
  display: none;
}

.warning-closeBtn {
  height: 100%;
  width: 20px;
  border: none;
  background-color: white !important;
  color: #F56C6C !important;
  padding: 0 !important;

}

.closed-message-box {
  background-color: #ececec;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 5px 10px;

}
</style>