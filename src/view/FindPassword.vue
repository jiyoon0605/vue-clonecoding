<template>
  <el-container direction="vertical" class="find-password">
    <Logo></Logo>
    <h3>{{ $tc('findPasswordMessage') }}</h3>
    <el-form>
      <el-form-item :label="$tc('emailInput')">
        <IdInput :input-value="email" @onChangeInput="onEmailChange"/>
        <WarningMessage :visible="warningMessageVisible" :message="$tc('emailWarning')"></WarningMessage>
      </el-form-item>
      <el-form-item>
        <el-button>{{ $tc('find') }}</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Logo from '@/components/logo/logo.vue';
import IdInput from '@/components/inputs/IdInput.vue';
import WarningMessage from '@/components/message/WarningMessage.vue';

@Component({
             components: {WarningMessage, IdInput, Logo}
           })
export default class FindPassword extends Vue {
  email: string = '';
  invalidEmail = true;


  onEmailChange(value: string) {
    const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    this.invalidEmail = re.test(this.email)
    this.email = value;
  }

  get warningMessageVisible() {
    return !this.invalidEmail
  }
}
</script>

<style>
.find-password {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 410px;
  margin: 0 auto;
  transform: translate(-50%, -55%);
}
</style>