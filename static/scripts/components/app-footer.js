Vue.component('app-footer', {
    props: [
        'author',
        'author-portfolio'
    ],
    template: `
        <footer class="app-footer">
            <div class="container">
                <div class="six columns">
                    <p>Creado por <a :href="authorPortfolio">{{author}}</a></p>
                </div>
                <div class="six columns">
                    <theme-selector @change-theme="$emit('change-theme', $event)"/>
                </div>
            </div>
        </footer>
    `
});