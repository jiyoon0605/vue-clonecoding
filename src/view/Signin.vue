<template>
  <el-container direction="vertical" class="login">
    <el-header>Safety R3</el-header>
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
      <el-form-item>
        <el-button class="textBtn">{{ $tc('signIn') }}</el-button>
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

import {Component, Vue} from "vue-property-decorator";
import EmailInput from "@/components/inputs/IdInput.vue";
import IconText from '@/components/icon/IconText.vue';
import PasswordInput from '@/components/inputs/passwordInput.vue';

@Component({
             components: {
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

  mounted() {
    this.$root.$i18n.locale = this.$route.params.lang;
    console.log(this.$tc('id'));
  }

  get currentLang() {
    const {lang} = this.$route.params;
    return lang;
  }


  onChangeLanguage(value: string) {
    this.$router.push({name: "SignUp", params: {lang: value}});
    this.$router.go();
  }

  refreshPage() {
    this.$route.go();
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