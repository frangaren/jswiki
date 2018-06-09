Vue.component('category', {
    props: [
        'value'
    ],
    template: `
        <div class="category">
            <span class="name">{{value.name}}</span>
            <div class="controls">
                <i class="fas fa-plus"></i>
                <i class="fas fa-trash" @click="onTrashClick"></i>
            </div>
        </div>
    `,
    methods: {
        onTrashClick: function () {
            axios.delete(`/api/v1/categories/${this.value._id}`)
                .then(res => this.$emit('delete', res))
                .catch(console.error);
        }
    }
});