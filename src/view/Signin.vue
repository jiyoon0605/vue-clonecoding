<template>
  <el-container direction="vertical" class="login">
    <Logo></Logo>
    <el-form>
      <h2>Sign In</h2>
      <el-form-item :label="$tc('id')">
        <EmailInput :input-value="inputForm.id" @onChangeInput="onChangeId"/>
      </el-form-item>
      <el-form-item :label="$tc('password')">
        <PasswordInput :input-value="inputForm.password" @onChangePasswordInput="onChangePassword"
                       @keyup.enter.native="onSubmit"/>
      </el-form-item>
      <el-form-item>

        <router-link :to="{name:'FindPassword',params:{lang:$route.params.lang}}">{{ $tc('findPassword') }}
        </router-link>
      </el-form-item>
      <WarningMessage :visible="warningMessageVisible" :message="singInErrorMessage"></WarningMessage>
      <el-form-item>
        <el-button v-loading="isLoading" class="textBtn" @click="onSubmit">{{ $tc('signIn') }}</el-button>
      </el-form-item>
    </el-form>
    <div>
      <IconText icon-name="el-icon-s-tools" :message="$tc('system')"></IconText>
      <IconText icon-name="el-icon-question" :message="$tc('help')"></IconText>
      <span>
         <i class="el-icon-picture-outline-round"></i>
        <span>
          <LanguageSelector></LanguageSelector>
        </span>
      </span>
    </div>
  </el-container>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import EmailInput from "@/components/inputs/EmailInput.vue";
import IconText from '@/components/icon/IconText.vue';
import PasswordInput from '@/components/inputs/PasswordInput.vue';
import {authentication} from '@/api/SigninApi'
import WarningMessage from '@/components/message/WarningMessage.vue';
import Logo from '@/components/logo/logo.vue';
import LanguageSelector from '@/components/selector/LanguageSelector.vue';

@Component({
             components: {
               LanguageSelector,
               Logo,
               WarningMessage,
               PasswordInput,
               IconText,
               EmailInput,
             }
           })
export default class Signup extends Vue {

  inputForm: any = {
    id: '',
    password: ''
  }
  warningMessageVisible = false;
  isLoading = false;
  singInErrorMessage = ""

  mounted() {
    this.$root.$i18n.locale = this.$route.params.lang;
  }

  @Watch('$route')
  protected watchRoute() {
    this.$root.$i18n.locale = this.$route.params.lang;
  }

  getSubmitData() {
    return {
      userId: this.inputForm.id,
      password: this.inputForm.password,
      language: this.$route.params.lang
    }
  }


  onSubmit() {

    (this as any).$message.closeAll();

    this.isLoading = true;
    authentication(this.getSubmitData())
        .then(({data}) => {
          this.isLoading = false;
          if (data.success) {
            this.$message({
                            message: 'Congrats, this is a success message.',
                            type: 'success',
                          });
            this.warningMessageVisible = false;
          } else {
            this.singInErrorMessage = data.errMsg
            this.warningMessageVisible = true;
          }
        })

  }


  onChangeId(value: string) {
    this.inputForm = {
      ...this.inputForm,
      id: value
    }
  }

  onChangePassword(value: string) {
    this.inputForm = {
      ...this.inputForm,
      password: value
    }
  }
}


</script>
<style>

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  margin: 0 auto;
  transform: translate(-50%, -55%);
}
</style>