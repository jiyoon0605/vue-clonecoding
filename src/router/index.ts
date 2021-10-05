import VueRouter, {RouteConfig} from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        name: 'SignIn',
        path: '/sign-in/:lang',
        component: ()=>import('@/view/Signin.vue'),
        props: true,
    },
    {
        path: '/',
        redirect: 'sign-in/en'
    },
    {
        name: "FindPassword",
        path: "/find-password/:lang",
        component: ()=>import('@/view/FindPassword.vue'),
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


export default router;