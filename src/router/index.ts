import VueRouter, {RouteConfig} from 'vue-router';
import Signup from '@/view/Signin.vue';
import FindPassword from '@/view/FindPassword.vue';
import Vue from 'vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        name: 'SignIn',
        path: '/sign-in/:lang',
        component: Signup,
        props: true,
    },
    {
        path: '/',
        redirect: 'sign-in/en'
    },
    {
        name: "FindPassword",
        path: "/find-password/:lang",
        component: FindPassword,
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