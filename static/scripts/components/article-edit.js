Vue.component('article-edit', {
    template: `
        <div class="article-edit container">
            <article-editor :value="article"/>
        </div>
    `,
    data: function () {
        return {
            article: {
                topic: 'Nuevo artículo',
                body: '',
                categories: []
            }
        }
    },
    created: function () {
        this.load();
    },
    onRouteUpdate: function () {
        this.load();
    },
    methods: {
        load: function () {
            axios.get(`/api/v1/articles/${this.$route.params.id}`)
                .then(res => this.article = res.data)
                .catch(console.error);
        },
        onDelete: function () {
            router.go(-1);
        }
    }
});