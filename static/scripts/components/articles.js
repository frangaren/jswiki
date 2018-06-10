Vue.component('articles', {
    template: `
        <div class="articles container">
            <article-short v-for="article in articles" :value="article"
                :key="article._id" @delete="onDelete"/>
        </div>
    `,
    created: function() {
        this.load();
    },
    onRouteUpdate: function() {
        this.load();
    },
    data: function() {
        return {
            articles: []
        };
    },
    methods: {
        load: function() {
            axios.get(`/api/v1/articles`)
                .then(res => this.articles = res.data)
                .catch(console.error);
        },
        onDelete: function(article) {
            for (let i = 0; i < this.articles.length; i++) {
                if (this.articles[i]._id === article._id) {
                    this.articles.splice(i, 1);
                    break;
                }
            }
        }
    }
});