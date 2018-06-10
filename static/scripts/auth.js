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
        localStorage.setItem('auth', JSON.stringify(this.state));
    }
};

if (localStorage.getItem('auth')) {
    auth.state = JSON.parse(localStorage.getItem('auth'));
}