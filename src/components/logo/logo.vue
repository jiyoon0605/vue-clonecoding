<template>
  <el-header>
    <router-link :to="{name:'SignIn',params:{lang:this.$route.params.lang}}"> Safety R3</router-link>
  </el-header>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Logo extends Vue {

}
</script>