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
        router.push('/');
    }
};

if (localStorage.getItem('auth')) {
    const authDetails = JSON.parse(localStorage.getItem('auth')).details;
    auth.login(authDetails);
    axios.post('/api/v1/tokens/check', authDetails)
        .then(res => {
            authDetails._id = res.data._id;
            auth.login(authDetails);
        })
        .catch(error => auth.logout());
}