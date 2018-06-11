Vue.component('article-new', {
    template: `
        <div class="article-new container">
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
    methods: {
        onSave: function () {
            axios.post(`/api/v1/articles`, this.article)
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