<template>
  <div>
    <SelectSponsorDialogue :visible="dialogVisible"
                            :sponsors="sponsors"
                            @onClose="onDialogueClose"></SelectSponsorDialogue>
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
          <SubmitButton @onSubmit="onSubmit" :message="$tc('signIn')"></SubmitButton>
        </el-form-item>
      </el-form>
      <div>
        <IconText icon-name="el-icon-s-tools" :message="$tc('system')"></IconText>
        <IconText icon-name="el-icon-question" :message="$tc('help')"></IconText>
        <span>
         <i class="el-icon-picture-outline-round"></i>
          <LanguageSelector></LanguageSelector>
      </span>
      </div>
    </el-container>
  </div>

</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import EmailInput from "@/components/inputs/EmailInput.vue";
import IconText from '@/components/icon/IconText.vue';
import PasswordInput from '@/components/inputs/PasswordInput.vue';
import {authentication} from '@/api/SigninApi'
import WarningMessage from '@/components/message/WarningMessage.vue';
import Logo from '@/components/logo/logo.vue';
import LanguageSelector from '@/components/selector/LanguageSelector.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import SelectSponsorDialogue from '@/components/dialogue/SelectSponesorDialogue.vue';

@Component({
             components: {
               SelectSponsorDialogue,
               SubmitButton,
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
  singInErrorMessage = "";
  dialogVisible = false;
  sponsors = []

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
            sessionStorage.setItem("token", data.data.token);
            sessionStorage.setItem('userKey', data.userKey.toString());
            this.dialogVisible = true;
            this.sponsors = data.data.sponsorList;
          } else {
            this.singInErrorMessage = data.errMsg
            this.warningMessageVisible = true;
          }
        })
        .catch(() => {
          this.warningMessageVisible = true;
          this.singInErrorMessage = "network error"
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

  onDialogueClose() {
    this.dialogVisible = false;
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