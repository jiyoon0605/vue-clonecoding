<template>
  <el-container direction="vertical" class="find-password">
    <Logo></Logo>
    <h3>{{ $tc('findPasswordMessage') }}</h3>
    <el-form>
      <el-form-item :label="$tc('emailInput')">
        <EmailInput :input-value="email" @onChangeInput="onEmailChange" :disable="inputDisable"
                    @keyup.enter.native="onSubmit"/>
        <WarningMessage :visible="warningMessageVisible" :message="$tc('emailWarning')"></WarningMessage>
      </el-form-item>
      <div v-if="inputDisable">{{ successMessage }}</div>
      <div v-else>
        <WarningMessage :visible="incorrectEmail" :message="errorMessage"></WarningMessage>
        <el-form-item>
          <el-button @click="onSubmit">{{ $tc('find') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
    <LanguageSelector></LanguageSelector>
  </el-container>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Logo from '@/components/logo/logo.vue';
import EmailInput from '@/components/inputs/EmailInput.vue';
import WarningMessage from '@/components/message/WarningMessage.vue';
import {FindPasswordSubmitForm} from '@/models/Model';
import {findPassword} from '@/api/FindPasswordApi';
import LanguageSelector from '@/components/selector/LanguageSelector.vue';

@Component({
             components: {LanguageSelector, WarningMessage, EmailInput, Logo}
           })
export default class FindPassword extends Vue {
  email: string = '';
  invalidEmail: boolean = true;
  errorMessage: string = '';
  incorrectEmail: boolean = false;
  inputDisable: boolean = false;
  successMessage: string = '';

  mounted() {
    this.$root.$i18n.locale = this.$route.params.lang;
  }

  @Watch('$route')
  protected watchRoute() {
    this.$root.$i18n.locale = this.$route.params.lang;
  }

  get warningMessageVisible() {
    return !this.invalidEmail
  }


  onEmailChange(value: string) {
    this.invalidEmail = this.checkEmail();
    this.email = value;
  }

  getSubmitData(): FindPasswordSubmitForm {
    return {
      email: this.email,
      language: this.$route.params.lang
    }
  }

  checkEmail() {
    const re = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
    return re.test(this.email)
  }

  onSubmit() {
    if (!this.checkEmail()) {
      return;
    }
    findPassword(this.getSubmitData()).then(({data}) => {
      if (data.success) {
        this.inputDisable = true;
        this.successMessage = data.data.message
      } else {
        this.incorrectEmail = true;
        this.errorMessage = data.errMsg;
      }
    })
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

