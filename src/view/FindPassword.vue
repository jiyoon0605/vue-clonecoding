<template>
  <el-container direction="vertical" class="find-password">
    <Logo></Logo>
    <h3>{{ $tc('findPasswordMessage') }}</h3>
    <el-form>
      <el-form-item :label="$tc('emailInput')">
        <IdInput/>
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

@Component({
             components: {IdInput, Logo}
           })
export default class FindPassword extends Vue {

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