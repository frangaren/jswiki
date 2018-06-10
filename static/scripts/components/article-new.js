Vue.component('article-new', {
    template: `
        <div class="article-new container">
            <article-editor v-model="article" @input="onSave"/>
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
    methods: {
        onSave: function () {
            axios.post(`/api/v1/articles`, this.article)
                .then(res => {
                    this.article = res.data;
                    router.push(`/article/${this.article._id}`);
                })
                .catch(console.error);
        }
    }
});