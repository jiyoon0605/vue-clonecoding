import VueI18n from 'vue-i18n';
import Vue from 'vue';
import en from '@/plugins/i18n/en';
import ko from '@/plugins/i18n/ko';
import ja from '@/plugins/i18n/ja';
import zh from '@/plugins/i18n/zh';

Vue.use(VueI18n);

const messages = {
    en,
    ko,
    ja,
    zh
}

const i18n =
    new VueI18n({
                    locale: 'en',
                    messages
                });

export default i18n;