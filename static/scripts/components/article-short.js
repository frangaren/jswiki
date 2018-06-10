Vue.component('article-short', {
    props: [
        'value'
    ],
    template: `
        <div class="article-short">
            <h3>
                <router-link :to="viewURL" class="name">
                    {{value.topic}}
                </router-link>
            </h3>
            <div class="article-categories">
                <category class="chip" v-for="category in categories" :value="category" 
                    :key="category._id" no-controls="true"/>
            </div>
            <div class="controls">
                <i class="fas fa-edit" @click="onEditClick"></i>
                <i class="fas fa-trash" @click="onTrashClick"></i>
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
    computed: {
        viewURL: function() {
            return `/article/${this.value._id}`;
        },
        editURL: function () {
            return `/article/${this.value._id}/edit`;
        }
    },
    methods: {
        load: function() {
            for (let category of this.value.categories) {
                axios.get(`/api/v1/categories/${category}`)
                    .then(res => this.categories.push(res.data))
                    .catch(console.error);
            }
        },
        onEditClick: function() {
            router.push(this.editURL);
        },
        onTrashClick: function() {
            axios.delete(`/api/v1/articles/${this.value._id}`)
                .then(res => this.$emit('delete', res.data))
                .catch(console.error);
        }
    }
});