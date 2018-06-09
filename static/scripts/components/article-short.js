Vue.component('article-short', {
    props: [
        'value'
    ],
    template: `
        <div class="article">
            <h3>{{value.topic}}</h3>
        </div>
    `,
});