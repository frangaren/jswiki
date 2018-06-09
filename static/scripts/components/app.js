Vue.component('app', {
    template: `
        <div class="app neutral">
            <app-header :title="title"/>
            <app-body/>
            <app-footer :author="author" :author-portfolio="authorPortfolio"/>
        </div>
    `,
    data: function () {
        return {
            title: 'JSwiki',
            author: 'Francisco García Encinas',
            authorPortfolio: 'https://github.com/frangaren'
        };
    }
});