<template>
  <el-container direction="vertical" class="login">
    <el-header>
      <router-link :to="{name:'SignIn',params:{lang:$route.params.lang}}"> Safety R3</router-link>
    </el-header>
    <el-form>
      <h2>Sign In</h2>
      <el-form-item :label="$tc('id')">
        <EmailInput :input-value="inputForm.id" @onChangeIdInput="onChangeId"/>
      </el-form-item>
      <el-form-item :label="$tc('password')">
        <PasswordInput :input-value="inputForm.password" @onChangePasswordInput="onChangePassword"/>
      </el-form-item>
      <el-form-item>

        <el-button type="text" class="textBtn">{{ $tc('findPassword') }}</el-button>
      </el-form-item>
      <WarningMessage :visible="warningMessageVisible" :message="$tc('signInError')"></WarningMessage>
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
          <el-select :value="currentLang" @change="onChangeLanguage">
          <el-option
              v-for="({label,value},index) of languages"
              :key="index"
              :label="label"
              :value="value"
          >
          </el-option>
        </el-select>
        </span>
      </span>
    </div>
  </el-container>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import EmailInput from "@/components/inputs/IdInput.vue";
import IconText from '@/components/icon/IconText.vue';
import PasswordInput from '@/components/inputs/passwordInput.vue';
import {authentication} from '@/api/SigninApi'
import WarningMessage from '@/components/message/WarningMessage.vue';

@Component({
             components: {
               WarningMessage,
               PasswordInput,
               IconText,
               EmailInput,
             }
           })
export default class Signup extends Vue {
  languages = [{
    label: 'Chinese(简体中文)',
    value: 'zh',
  },
    {
      label: 'English(English)',
      value: 'en',
    },
    {
      label: 'Japanese(日本語)',
      value: 'ja',
    },
    {
      label: 'Korean(한국어)',
      value: 'ko',
    }
  ]
  inputForm: any = {
    id: '',
    password: ''
  }
  warningMessageVisible = false;
  isLoading = false;

  mounted() {
    this.$root.$i18n.locale = this.$route.params.lang;
  }

  get currentLang() {
    const {lang} = this.$route.params;
    return lang;
  }

  get submitData() {
    return {
      userId: this.inputForm.id,
      password: this.inputForm.password,
      language: this.$route.params.lang
    }
  }

  @Watch('$route')
  protected watchRoute() {
    this.$root.$i18n.locale = this.$route.params.lang;
  }

  onChangeLanguage(value: string) {
    this.$router.push({name: "SignIn", params: {lang: value}});
  }

  onSubmit() {
    console.log(this.$root.$i18n.locale)
    this.isLoading = true;
    authentication(this.submitData)
        .then(({data}) => {
          this.isLoading = false;
          if (data.success) {
            this.$message({
                            message: 'Congrats, this is a success message.',
                            type: 'success'
                          });
            this.warningMessageVisible = false;
          } else {
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