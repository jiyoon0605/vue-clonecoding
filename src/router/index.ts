import Vue from "vue";
import VueRouter, {RouteConfig} from 'vue-router';
import Signup from '@/view/Signup.vue';

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