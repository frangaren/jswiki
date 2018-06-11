Vue.component('register', {
    template: `
        <div class="register container">
            <form class="neutral" @submit="onSubmit">
                <div>
                    <label for="name">Nombre:</label>
                    <input name="name" type="text" v-model="user.name" required/>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input name="email" type="email" v-model="user.email" required/>
                </div>
                <div>
                    <label for="username">Usuario:</label>
                    <input name="username" type="text" v-model="user.username" required/>
                </div>
                <div>
                    <label for="password">Contraseña:</label>
                    <input type="password" v-model="user.password" required/>
                </div>
                <div class="error-message">
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
                    if (error.response.status == 409 ||
                        error.response.status == 422) {
                        this.error = error.response.data.message;
                    } else {
                        handleError(error);
                    }
                });
            event.preventDefault();
        }
    }
});