Vue.component('app', {
    template: `
        <div class="app neutral" :style="theme">
            <app-header :title="title"/>
            <app-body/>
            <app-footer :author="author" :author-portfolio="authorPortfolio"
                @change-theme="theme = $event"/>
        </div>
    `,
    created: function () {
        if (localStorage.getItem('theme')) {
            this.theme = JSON.parse(localStorage.getItem('theme'));
        }
    },
    watch: {
        theme: function() {
            localStorage.setItem('theme', JSON.stringify(this.theme));
        }
    },
    data: function () {
        return {
            title: 'JSwiki',
            author: 'Francisco García Encinas',
            authorPortfolio: 'https://github.com/frangaren',
            theme: {}
        };
    },
});