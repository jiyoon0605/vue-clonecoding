import VueRouter, {RouteConfig} from 'vue-router';
import Vue from 'vue';
import i18n from '@/plugins/i18n';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        name: 'SignIn',
        path: '/sign-in/:lang',
        component: () => import('@/view/Signin.vue'),
        props: true,
    },
    {
        path: '/',
        redirect: 'sign-in/en'
    },
    {
        name: "FindPassword",
        path: "/find-password/:lang",
        component: () => import('@/view/FindPassword.vue'),
        props: true
    },
    {
        path: '/find-password',
        redirect: 'find-password/en'
    },
];


const router = new VueRouter({
                                 mode: "history",
                                 routes
                             });

router.beforeEach((to, from, next) => {
    i18n.locale = to.params.lang;
    next();
})


export default router;