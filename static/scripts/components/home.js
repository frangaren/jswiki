Vue.component('home', {
    template: `
        <div class="home">
            <div class="container">
                <h2 class="twelve columns text-align-center">¡Hola!</h2>
            </div>
            <div class="container">
                <div class="four columns text-align-justify">
                    <h3 class="full-width text-align-center">
                        ¿Qué es JSwiki?
                    </h3>
                    <p>
                        JSwiki es una wiki escrita en JavaScript utilizando node,
                        express y mongodb en el backend y HTML5, CSS3 y vue en el
                        frontend.
                    </p>
                </div>
                <div class="four columns">
                    <h3 class="full-width text-align-center">
                        Características
                    </h3>
                    <p>
                        <ul>
                            <li>Simple</li>
                            <li>Sistema de usuarios</li>
                            <li>Artículos clasificados en categorías</li>
                            <li>Utiliza markdown</li>
                        </ul>
                    </p>
                </div>
                <div class="four columns text-align-justify">
                    <h3 class="full-width text-align-center">
                        Acerca del autor
                    </h3>
                    <p>
                        Soy <a href="https://github.com/frangaren/">Francisco
                        García Encinas</a>, un estudiante del grado
                        de ingeniería informática de la
                        <a href="https://usal.es/">USAL</a>.
                    </p>
                </div>
            </div>
            <div class="container">
                <div class="twelve columns text-align-center">
                    <button class="accent big" @click="onRegisterClick">
                        ¡Registrate!
                    </button>
                </div>
            </div>
        </div>
    `,
    methods: {
        onRegisterClick: function () {
            router.push('/register');
        }
    }
});