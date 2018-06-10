const routes = [
    {path: '/', component: Vue.component('home')},
    {path: '/categories', component: Vue.component('categories')},
    {path: '/articles', component: Vue.component('articles')},
    {path: '/category/:id', component: Vue.component('category-details')}
];

const router = new VueRouter({
    routes
});