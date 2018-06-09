const routes = [
    {path: '/', component: Vue.component('home')},
    {path: '/categories', component: Vue.component('categories')}
];

const router = new VueRouter({
    routes
});