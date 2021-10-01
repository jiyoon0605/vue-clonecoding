import VueRouter, {RouteConfig} from 'vue-router';
import Signup from '@/view/Signin.vue';
import Vue from 'vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        name: 'SignIn',
        path: '/:lang',
        component: Signup,
        props: true
    },
];


const router = new VueRouter({
                                 mode: "history",
                                 routes
                             });


export default router;