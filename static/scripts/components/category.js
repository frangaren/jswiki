Vue.component('category', {
    props: [
        'value',
        'no-controls'
    ],
    template: `
        <div class="category">
            <i class="fas fa-bars handle" v-if="!noControls && value._id !== 'root'"></i>
            <new-category-modal :parent="value._id" v-if="modalVisible" 
                @close="modalVisible = false" @create="$emit('create', $event)"/>
            <router-link :to="URL" class="name" v-if="!editing">
                {{value.name}}</router-link>
            <input type="text" v-model="newName" v-if="editing"></input>
            <div class="controls" v-if="!noControls && auth.logged">
                <i class="fas fa-check" @click="onCheckClick"
                    v-if="editing"></i>
                <i class="fas fa-plus" @click="onPlusClick"
                    v-if="!editing"></i>
                <i class="fas fa-edit" @click="onEditClick" 
                    v-if="value._id !== 'root' && !editing"></i>
                <i class="fas fa-trash" @click="onTrashClick" 
                    v-if="value._id !== 'root' && !editing"></i>
            </div>
        </div>
    `,
    data: function() {
        return {
            modalVisible: false,
            editing: false,
            newName: '',
            auth: auth.state
        };
    },
    computed: {
        URL: function() {
            return `/category/${this.value._id}`;
        }
    },
    methods: {
        onPlusClick: function () {
            this.modalVisible = true;
        },
        onEditClick: function () {
            this.newName = this.value.name;
            this.editing = true;
        },
        onCheckClick: function () {
            const newValue = {
                name: this.newName,
            };
            this.editing = false;
            axios.patch(`/api/v1/categories/${this.value._id}`, newValue)
                .then(res => this.$emit('input', res.data))
                .catch(handleError);
        },
        onTrashClick: function () {
            axios.delete(`/api/v1/categories/${this.value._id}`)
                .then(res => this.$emit('delete', res.data))
                .catch(handleError);
        }
    }
});