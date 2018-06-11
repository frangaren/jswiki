Vue.component('article-history', {
    template: `
        <div class="article-history container">
            <history-viewer v-model="article" @input="onSave"/>
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
                .catch(handleError);
        },
        onDelete: function () {
            router.go(-1);
        },
        onSave: function () {
            axios.patch(`/api/v1/articles/${this.$route.params.id}`, this.article)
                .then(res => {
                    this.article = res.data;
                    router.push(`/article/${this.article._id}`);
                })
                .catch(handleError);
        }
    }
});