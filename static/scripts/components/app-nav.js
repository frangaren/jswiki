Vue.component('app-nav', {
    template: `
        <nav class="app-nav">
            <router-link to="/">Principal</router-link>
            <router-link to="/categories">Categorías</router-link>
            <router-link to="/articles">Artículos</router-link>
            <router-link to="/login">Identificarse</router-link>
            <router-link to="/register">Registrarse</router-link>
        </nav>
    `
});