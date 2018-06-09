Vue.component('categories', {
    props: [
        'value'
    ],
    template: `
        <div class="categories full-width">
            <div class="container">
                <category-list :value="rootCategory"/>
            </div>
        </div>
    `,
    data: function() {
        return {
            rootCategory: {
                _id: 'root',
                parent: null,
                name: 'Raíz'
            }
        }
    }
});