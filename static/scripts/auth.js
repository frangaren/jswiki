const auth = {
    state: {
        logged: false,
        details: {
            _id: '',
            access_token: '',
            expires_in: '',
            refresh_token: ''
        }
    },
    login: function (details) {
        this.state.logged = true;
        this.state.details = details;
        axios.defaults.params = {
            access_token: this.state.details.access_token
        };
        localStorage.setItem('auth', JSON.stringify(this.state));
    },
    logout: function() {
        this.state.logged = false;
        this.state.details = {
            _id: '',
            access_token: '',
            expires_in: '',
            refresh_token: ''
        };
        axios.defaults.params = {
            access_token: this.state.details.access_token
        };
        localStorage.setItem('auth', JSON.stringify(this.state));
        router.go(router.currentRoute);
    }
};

if (localStorage.getItem('auth')) {
    const savedAuth = JSON.parse(localStorage.getItem('auth'));
    if (savedAuth.logged) {
        auth.login(savedAuth.details);
        axios.post('/api/v1/tokens/check', savedAuth.details)
            .then(res => {
                savedAuth.details._id = res.data._id;
                auth.login(savedAuth.details);
            })
            .catch(error => auth.logout());
    }
}