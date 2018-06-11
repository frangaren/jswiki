Vue.component('register', {
    template: `
        <div class="register container">
            <form class="neutral" @submit="onSubmit">
                <div>
                    <label for="name">Nombre:</label>
                    <input name="name" type="text" v-model="user.name"/>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input name="email" type="email" v-model="user.email"/>
                </div>
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
                        Registrarse
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
            axios.post('/api/v1/users', this.user)
                .then(res => {
                    //this.auth.logged = true;
                    //this.auth.details = res.data;
                    router.push('/');
                })
                .catch(error => {
                    handleError(error);
                });
            event.preventDefault();
        }
    }
});