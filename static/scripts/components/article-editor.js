Vue.component('article-editor', {
    props: [
        'value'
    ],
    components: {
        multiselect: VueMultiselect.default
    },
    template: `
        <div class="article-editor">
            <div class="controls">
                <button class="accent simple">Vista previa</button>
                <button class="accent">Guardar</button>
            </div>
            <div class="title">
                <h3 class="title-field" v-if="!editingTitle">
                    {{article.topic}}
                </h3>
                <input class="title-field" type="text" v-model="article.topic" v-else/>
                <div class="controls">
                    <i class="fas fa-check" @click="onCheckTopicClick"
                        v-if="editingTitle"></i>
                    <i class="fas fa-edit" @click="onEditTopicClick" 
                        v-else></i>
                </div>
            </div>
            <multiselect v-model="selectedCategories"
                :options="categories"
                :multiple=true
                placeholder="Selecciona las categorías"
                selectedLabel="Seleccionado"
                selectLabel="Seleccionar"
                deselectLabel="Quitar"
                label="name"
                track-by="_id"
                ></multiselect>
            <textarea class="editor">
            </textarea>
        </div>
    `,
    created: function () {
        this.load();
    },
    onRouteUpdate: function () {
        this.load();
    },
    data: function () {
        return {
            editingTitle: false,
            article: {
                topic: '',
                body: '',
                categories: []
            },
            selectedCategories: [],
            categories: []
        };
    },
    watch: {
        value: function() {
            this.load();
        },
        selectedCategories: function() {
            this.article.categories = [];
            for (let category of this.selectedCategories) {
                this.article.categories.push(category._id);
            }
        }
    },
    methods: {
        load: function() {
            this.article = this.value;
            axios.get('/api/v1/categories')
                .then(res => {
                    this.categories = res.data;
                    this.selectedCategories = [];
                    for (let categoryId of this.article.categories) {
                        for (let category of this.categories) {
                            if (category._id === categoryId) {
                                this.selectedCategories.push(category);
                                break;
                            }
                        }
                    }
                })
                .catch(console.error);
        },
        onEditTopicClick: function() {
            this.editingTitle = true;
        },
        onCheckTopicClick: function() {
            this.editingTitle = false;
        }
    }
});