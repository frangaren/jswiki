Vue.component('category-details', {
    template: `
        <div class="category-details container">
            <h2>{{category.name}}</h2>
            <div class="articles">
                <article-short v-for="article in articles" :value="article"
                    :key="article._id" @delete="onDelete"/>
            </div>
        </div>
    `,
    created: function () {
        this.load();
    },
    onRouteUpdate: function () {
        this.load();
    },
    data: function () {
        return {
            category: {
                name: ''
            },
            articles: []
        };
    },
    methods: {
        load: function () {
            axios.get(`/api/v1/categories/${this.$route.params.id}`)
                .then(res => this.category = res.data)
                .catch(handleError);
            axios.get(`/api/v1/categories/${this.$route.params.id}/articles`)
                .then(res => this.articles = res.data)
                .catch(handleError);
        },
        onDelete: function (article) {
            for (let i = 0; i < this.articles.length; i++) {
                if (this.articles[i]._id === article._id) {
                    this.articles.splice(i, 1);
                    break;
                }
            }
        }
    }
});