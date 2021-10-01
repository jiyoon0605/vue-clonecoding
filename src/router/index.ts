import VueRouter, {RouteConfig} from 'vue-router';
import Signup from '@/view/Signup.vue';
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