<template>
  <el-select :value="currentLang" @change="onChangeLanguage">
    <el-option
        v-for="({label,value},index) of languages"
        :key="index"
        :label="label"
        :value="value"
    >
    </el-option>
  </el-select>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class LanguageSelector extends Vue {
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

  get currentLang() {
    const {lang} = this.$route.params;
    return lang;
  }

  onChangeLanguage(value: string) {
    this.$router.push({name: this.$route.name || "", params: {lang: value}});
  }
}
</script>