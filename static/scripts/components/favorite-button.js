Vue.component('favorite-button', {
    props: [
        'article'
    ],
    template: `
        <span :class="{'favorite-button': true, 'toggled': status}" v-if="auth.logged">
            <i class="fas fa-star" @click="toggleFavorite" :key="article.id"></i>
        </span>
    `,
    data: function() {
        return {
            status: false,
            auth: auth.state
        }
    },
    created: function() {
        this.load();
    },
    beforeRouteUpdate: function() {
        this.load();
    },
    watch: {
        article: function() {
            this.load();
        }
    },
    methods: {
        load: function() {
            axios.get(`/api/v1/users/${this.auth.details._id}/favorites/${this.article._id}`)
                .then(res => this.status = res.data['is-favorite'])
                .catch(console.error);
        },
        toggleFavorite: function() {
            if (this.status) {
                axios.delete(`/api/v1/users/${this.auth.details._id}/favorites`,
                    {data: {article: this.article._id}})
                    .then(res => this.status = false)
                    .catch(console.error);
            } else {
                axios.post(`/api/v1/users/${this.auth.details._id}/favorites`,
                    {article: this.article._id})
                    .then(res => this.status = true)
                    .catch(console.error);
            }
        }
    }
});