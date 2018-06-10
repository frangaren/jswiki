Vue.component('history-viewer', {
    props: [
        'value'
    ],
    components: {
        multiselect: VueMultiselect.default
    },
    template: `
        <div class="history-viewer">
            <div class="controls">
                <button class="accent simple"
                    @click="showPreview = false"
                    v-if="showPreview">Volver al histórico</button>
                <button class="accent simple"
                    @click="onPreview"
                    v-else>Vista previa</button>
                <button class="accent"
                    @click="onRestore"
                >Restaurar</button>
            </div>
            <div class="preview" v-if="showPreview">
                <article-viewer :value="article" :no-controls="true"/>
            </div>
            <div class="viewer" v-else>
                <multiselect v-model="comparisonHistoric"
                    :options="history"
                    :multiple=false
                    placeholder="Selecciona la versión con la que comparar"
                    selectedLabel="Seleccionado"
                    selectLabel="Seleccionar"
                    deselectLabel="Quitar"
                    label="date"
                    track-by="_id"
                    ></multiselect>
                <div class="title">
                    <h3 class="title-field">
                        <span v-for="diff in topicDiffs" :class="{added: diff.added, 
                            removed: diff.removed}">{{diff.value}}</span>
                    </h3>
                </div>
                <div class="diff neutral">
                    <span v-for="diff in bodyDiffs" :class="{added: diff.added, 
                        removed: diff.removed}">{{diff.value}}</span>
                </div>
            </div>
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
            article: {
                topic: '',
                body: '',
                categories: []
            },
            history: [],
            comparisonHistoric: [],
            showPreview: false
        };
    },
    computed: {
        bodyDiffs: function () {
            if (this.article.body) {
                return JsDiff.diffWords(this.article.body, this.value.body);
            } else {
                return [];
            }
        },
        topicDiffs: function () {
            if (this.article.topic) {
                return JsDiff.diffChars(this.article.topic, this.value.topic);
            } else {
                return [];
            }
        },
    },
    watch: {
        value: function() {
            this.load();
        },
        comparisonHistoric: function() {
            this.article.topic = this.comparisonHistoric.topic;
            this.article.body = this.comparisonHistoric.body;
        }
    },
    methods: {
        load: function() {
            this.article.topic = this.value.topic;
            this.article.body = this.article.body;
            this.comparisonHistoric = [];
            if (this.value._id) {
                axios.get(`/api/v1/articles/${this.value._id}/history`)
                    .then(res => {
                        this.history = res.data;
                        this.comparisonHistoric = this.history[0];
                    })
                    .catch(console.error);
            }
        },
        onRestore: function() {
            this.article.categories = this.value.categories;
            this.$emit('input', this.article);
        },
        onPreview: function() {
            this.showPreview = true;
            if (MathJax) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            }
        }
    }
});