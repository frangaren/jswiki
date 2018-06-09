Vue.component('article-short', {
    props: [
        'value'
    ],
    template: `
        <div class="article-short">
            <h2>{{value.topic}}</h2>
            <div class="article-categories">
                <category class="chip" v-for="category in categories" :value="category" 
                    :key="category._id" no-controls="true"/>
            </div>
        </div>
    `,
    data: function() {
        return {
            categories: []
        };
    },
    created: function () {
        this.load();
    },
    watch: {
        value: function() {
            this.categories = [];
            this.load();
        }
    },
    methods: {
        load: function() {
            for (category of this.value.categories) {
                axios.get(`/api/v1/categories/${category}`)
                    .then(res => this.categories.push(res.data))
                    .catch(console.error);
            }
        }
    }
});