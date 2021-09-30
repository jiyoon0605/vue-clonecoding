import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);


const messages = {
    datepicker: {
        now: 'now',
        today: 'today',
        cancel: 'cancel',
        clear: 'clear',
        confirm: 'confirm',
        selectDate: 'selectDate',
        selectTime: 'selectTime',
        startTime: 'startTime',
        endTime: 'endTime',
        year: 'year',
        month: 'Month',
        week: 'week',
        weeks: {
            sun: 'sun',
            mon: 'mon',
            tue: 'tue',
            wed: 'wed',
            thu: 'thu',
            fri: 'fri',
            sat: 'sat'
        },
        months: {
            jan: 'jan',
            feb: 'feb',
            mar: 'mar',
            apr: 'apr',
            may: 'may',
            jun: 'jun',
            jul: 'jul',
            aug: 'aug',
            sep: 'sep',
            oct: 'oct',
            nov: 'nov',
            dec: 'dec'
        }
    }
}

export const i18n = new VueI18n(
    {
        locale: 'en',
        fallbackLocale: 'en',
        messages
    });