Vue.component('app-nav', {
    template: `
        <nav class="app-nav">
            <router-link to="/">Principal</router-link>
            <router-link to="/categories">Categorías</router-link>
            <router-link to="/articles">Artículos</router-link>
            <router-link to="/login" v-if="!auth.logged">Identificarse</router-link>
            <router-link to="/register" v-if="!auth.logged">Registrarse</router-link>
            <router-link :to="profileURL" v-if="auth.logged">Perfil</router-link>
            <router-link to="/logout" v-if="auth.logged">Cerrar sesión</router-link>
        </nav>
    `,
    data: function() {
        return {
            auth: auth.state
        }
    },
    computed: {
        profileURL: function() {
            return `/profile/${this.auth.details._id}`;
        }
    }
});