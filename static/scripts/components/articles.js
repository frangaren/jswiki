Vue.component('articles', {
    template: `
        <div class="articles container">
            <article-short v-for="article in articles" :value="article" :key="article._id"/>
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
        }
    }
});