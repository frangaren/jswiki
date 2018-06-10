Vue.component('profile', {
    template: `
        <div class="profile container">
            <div class="twelve columns text-align-center">
                <img :src="avatarURL" />
            </div>
            <div class="details three-offset six columns" v-if="!editing">
                <div>
                    <span>{{user.username}} ({{user.name}})</span>
                </div>
                <div>{{user.email}}</div>
                <div>
                    <button class="accent"
                        v-if="user._id === auth.details._id && !editing"
                        @click="onEditClick">
                        Editar
                    </button>
                </div>
            </div>
            <form class="edit three-offset six columns" v-if="editing" @submit="onSubmit">
                <div class="name">
                    <label for="name">Nombre:</label>
                    <input name="name" type="text" v-model="copy.name"></input>
                </div>
                <div class="username">
                    <label for="username">Usuario:</label>
                    <input name="username" type="text" v-model="copy.username">
                    </input>
                </div>
                <div class="email">
                    <label for="email">Correo:</label>
                    <input name="email" type="email" v-model="copy.email">
                    </input>
                </div>
                <div class="password">
                    <label for="password">Contraseña:</label>
                    <input name="password" type="password" v-model="copy.password" >
                    </input>
                </div>
                <div class="text-align-center">
                    <button class="accent"
                        v-if="editing"
                        >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    `,
    data: function() {
        return {
            user: {
                _id: '',
                username: '',
                name: '',
                email: ''
            },
            copy: {
                _id: '',
                username: '',
                name: '',
                email: '',
                password: ''
            },
            editing: false,
            auth: auth.state
        };
    },
    created: function () {
        this.load();
    },
    beforeRouteUpdate: function () {
        this.load();
    },
    computed: {
        avatarURL: function (){
            const hash = md5(this.user.email);
            return `https://www.gravatar.com/avatar/${hash}?s=256`;
        }
    },
    methods: {
        load: function () {
            axios.get(`/api/v1/users/${this.$route.params.id}`)
                .then(res => {
                    this.user = res.data;
                    this.copyUser;
                })
                .catch(console.error);
        },
        onEditClick: function() {
            this.copyUser();
            this.editing = true;
        },
        onSubmit: function(event) {
            this.patchDatabase();
            event.preventDefault();
            this.editing = false;
        },
        copyUser: function() {
            this.copy.name = this.user.name;
            this.copy.username = this.user.username;
            this.copy.email = this.user.email;
            this.copy.password = this.user.password;
        },
        patchDatabase: function() {
            axios.patch(`/api/v1/users/${this.$route.params.id}`, this.copy)
                .then(res => this.user = res.data)
                .catch(console.error);
        }
    }
});