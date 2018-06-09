Vue.component('app', {
    template: `
        <div class="app neutral">
            <app-header :title="title"/>
            <app-body/>
        </div>
    `,
    data: function () {
        return {
            title: 'JSwiki'
        };
    }
});