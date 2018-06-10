Vue.component('article-details', {
    template: `
        <div class="article-details container">
            <article-viewer :value="article" @delete="onDelete"/>
        </div>
    `,
    data: function() {
        return {
            article: {
                topic: '',
                body: '',
                categories: ''
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