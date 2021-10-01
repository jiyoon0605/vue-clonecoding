import VueRouter, {RouteConfig} from 'vue-router';
import Signup from '@/view/Signin.vue';
import Vue from 'vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        name: "SignUp",
        path: "/",
        component: Signup
    }
];



const router = new VueRouter({
                                 routes
                             });

export default router;