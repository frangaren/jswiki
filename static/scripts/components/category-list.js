Vue.component('category-list', {
    props: [
        'parent'
    ],
    template:`
        <ul class="category-list">
            <li v-for="category in categories">
                <span>{{category.name}}</span>
                <category-list :parent="category._id"/>
            </li>
        </ul>
    `,
    created: function () {
        this.load();
    },
    beforeRouteUpdate: async function (to) {
        this.load();
    },
    data: function () {
        return {
            categories: []
        };
    },
    methods: {
        load: function() {
            axios.get(`/api/v1/categories/${this.parent}/children`)
                .then(res => this.categories = res.data)
                .catch(console.error);
        }
    }
});