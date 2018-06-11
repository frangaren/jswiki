Vue.component('category-list', {
    props: [
        'value'
    ],
    template:`
        <div class="category-list">
            <category :value="value" @input="$emit('input', $event)"
                @delete="$emit('delete', $event)" @create="onCreate"/>
            <draggable class="category-children" v-model="categories"
                :options="{group: 'categories'}"
                @add="onAdd">
                <category-list v-for="category in categories" :key="category._id" 
                    @delete="onDelete" :value="category" @input="onUpdate(category, $event)"/>
            </draggable>
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
            axios.get(`/api/v1/categories/${this.value._id}/children`)
                .then(res => this.categories = res.data)
                .catch(handleError);
        },
        onAdd: function(event) {
            const category = this.categories[event.newIndex];
            category.parent = this.value._id;
            axios.patch(`/api/v1/categories/${category._id}`, category)
                .catch(handleError);
        },
        onDelete: function(category) {
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i]._id === category._id) {
                    this.categories.splice(i, 1);
                    break;
                }
            }
        },
        onCreate: function(category) {
            this.categories.unshift(category);
        },
        onUpdate: function(oldValue, newValue) {
            Vue.set(this.categories, this.categories.indexOf(oldValue), newValue);
        }
    }
});