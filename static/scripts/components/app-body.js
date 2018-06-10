Vue.component('app-body', {
    template: `
        <main class="app-body primary">
            <router-view :key="$route.fullPath"/>
        </main>
    `
});