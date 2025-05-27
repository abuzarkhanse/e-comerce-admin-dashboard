import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';


const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

console.log("Router initialized with:", routes);
export default router;
