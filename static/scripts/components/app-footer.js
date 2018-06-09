Vue.component('app-footer', {
    props: [
        'author',
        'author-portfolio'
    ],
    template: `
        <footer class="app-footer">
            <div class="container">
                <p>Creado por <a :href="authorPortfolio">{{author}}</a></p>
            </div>
        </footer>
    `
});