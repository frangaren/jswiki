Vue.component('article-editor', {
    props: [
        'value'
    ],
    template: `
        <div class="article-editor">
            <div class="controls">
            </div>
            <div class="editor">
                <textarea>
                </textarea>
            </div>
        </div>
    `,
});