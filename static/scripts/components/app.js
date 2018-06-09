Vue.component('app', {
    template: `
        <app-header :title="title"/>
    `,
    data: function () {
        return {
            title: 'JSwiki'
        };
    }
});