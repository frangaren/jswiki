Vue.component('article-viewer', {
    props: [
        'value',
        'no-controls'
    ],
    template: `
        <article class="article-viewer">
            <header>
                <article-short :value="value" :no-controls="noControls"
                    @delete="$emit('delete', $event)"/>
            </header>
            <section class="article-body neutral" v-html="renderedBody">
            </section>
        </article>
    `,
    computed: {
        renderedBody: function () {
            let markdown = markdownit({
                highlight: function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(lang, str).value;
                        } catch (__) { }
                    }
                    return '';
                }
            }).use(window.markdownitMathjax());
            if (typeof MathJax !== 'undefined') {
                MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
            }
            return markdown.render(this.value.body);
        }
    }
});