Vue.component('app', {
    template: `
        <div class="app">
            <app-header :title="title"/>
            <router-view></router-view>
        </div>
    `,
    data: function () {
        return {
            title: 'JSwiki'
        };
    }
});