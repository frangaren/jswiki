Vue.component('new-category-modal', {
    props: [
        'parent'
    ],
    template: `
        <modal @close="$emit('close')">
            <h3 slot="header">Nueva categoría</h3>
            <div slot="body">
                <input type="text" placeholder="Nombre" v-model="category.name"/>
                <div class="error-message">
                    {{error}}
                </div>
            </div>
            <div slot="footer">
                <button class="primary simple" @click="$emit('close')">Cancelar</button>
                <button class="primary simple" @click="onSubmit">Crear</button>
            </div>
        </modal>
    `,
    data: function() {
        return {
            category: {
                parent: '',
                name: ''
            },
            error: ''
        };
    },
    watch: {
        parent: function(newValue, oldValue) {
            console.log(newValue);
            this.category.parent = newValue;
        }
    },
    created: function () {
        this.category.parent = this.parent;
    },
    methods: {
        onSubmit: function() {
            axios.post('/api/v1/categories', this.category)
                .then(res => {
                    this.$emit('create', res.data);
                    this.$emit('close');
                })
                .catch(error => {
                    if (error.response.status == 409 ||
                        error.response.status == 422) {
                        this.error = error.response.data.message;
                    } else {
                        handleError(error);
                    }
                });
        }
    }
});