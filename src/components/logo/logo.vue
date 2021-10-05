<template>
  <el-header>
    <router-link :to="route"> Safety R3</router-link>
  </el-header>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Logo extends Vue {

  get route() {
    return {name: 'SignIn', params: {lang: this.$route.params.lang}}
  }

}
</script>