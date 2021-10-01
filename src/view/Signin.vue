<template>
  <el-container direction="vertical" class="login">
    <el-header>Safety R3</el-header>
    <el-form>
      <h2>Sign In</h2>
      <el-form-item :label="$tc('id')">
        <EmailInput/>
      </el-form-item>
      <el-form-item :label="$tc('password')">
        <EmailInput/>
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
          <el-select>
          <el-option>

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

@Component({
             components: {IconText, EmailInput}
           })
export default class Signup extends Vue {

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