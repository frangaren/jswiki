Vue.component('login', {
    template: `
        <div class="login container">
            <form class="neutral" @submit="onSubmit">
                <div>
                    <label for="username">Usuario:</label>
                    <input name="username" type="text" v-model="user.username"/>
                </div>
                <div>
                    <label for="password">Contraseña:</label>
                    <input type="password" v-model="user.password"/>
                </div>
                <div class="error">
                    {{error}}
                </div>
                <div class="controls">
                    <button class="primary">
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    `,
    data: function() {
        return {
            user: {
                username: '',
                password: ''
            },
            error: '',
            auth: auth.state
        }
    },
    methods: {
        onSubmit: function(event) {
            axios.post('/api/v1/tokens/grant', this.user)
                .then(res => {
                    auth.login(res.data);
                    router.push('/');
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.error = error.response.data.error_description;
                    } else {
                        handleError(error);
                    }
                });
            event.preventDefault();
        }
    }
});