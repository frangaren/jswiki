Vue.component('app-header', {
    props: [
        'title'
    ],
    template: `
        <header class="app-header">
            <div class="container">
                <h1 class="text-align-center">{{title}}</h1>
                <app-nav/>
            </div>
        </header>
    `
});