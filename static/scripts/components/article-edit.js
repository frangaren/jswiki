Vue.component('article-edit', {
    template: `
        <div class="article-edit container flex">
            <div class="error-message">
                {{error}}
            </div>
            <article-editor v-model="article" @input="onSave"/>
        </div>
    `,
    data: function () {
        return {
            article: {
                topic: 'Nuevo artículo',
                body: '',
                categories: []
            },
            error: ''
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
                .catch(error => {
                    if (error.response.status == 409 ||
                        error.response.status == 422) {
                        this.error = error.response.data.message;
                    } else {
                        handleError(error);
                    }
                });
        }
    }
});