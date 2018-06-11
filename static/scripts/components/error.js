Vue.component('error', {
    template: `
        <div class="error">
            <div class="container text-align-center">
                <h2>{{$route.params.number}}</h2>
                <h3>{{description}}</h3>
            </div>
        </div>
    `,
    computed: {
        description: function() {
            const descriptions = {
                404: 'No encontrado',
                500: 'Error interno',
                400: 'No autorizado'
            };
            return descriptions[this.$route.params.number] || '';
        }
    }
})