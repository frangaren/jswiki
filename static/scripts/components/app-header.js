Vue.component('app-header', {
    props: [
        'title'
    ],
    template: `
        <header>
            <h1>{{title}}</h1>
            <app-nav>
            </app-nav>
        </header>
    `
});