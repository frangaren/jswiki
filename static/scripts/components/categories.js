Vue.component('categories', {
    props: [
        'value'
    ],
    template: `
        <div class="categories full-width">
            <div class="container">
                <category-list parent="root"/>
            </div>
        </div>
    `
});