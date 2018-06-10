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
            <section class="article-body neutral">
                {{value.body}}
            </section>
        </article>
    `,
});