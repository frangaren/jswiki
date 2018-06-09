Vue.component('category-list', {
    props: [
        'parent'
    ],
    template:`
        <div class="category-list">
            <div class="category-list-item" v-for="category in categories">
                <category :value="category" @delete="onDelete"/>
                <category-list :parent="category._id"/>
            </div>
        </div>
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
        },
        onDelete: function() {
            this.load();
        }
    }
});