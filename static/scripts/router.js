const routes = [
    {path: '/', component: Vue.component('home')},
    {path: '/categories', component: Vue.component('categories')},
    {path: '/articles', component: Vue.component('articles')},
    {path: '/category/:id', component: Vue.component('category-details')},
    {path: '/articles/new', component: Vue.component('article-new')},
    {path: '/article/:id', component: Vue.component('article-details')},
    {path: '/article/:id/edit', component: Vue.component('article-edit')}
];

const router = new VueRouter({
    routes
});