const LoginWindow = {

	data: function () {
		return {
			username: 'joaozinho',
			password: 'senhaDoJao'
		}
	},

	methods: {
		"authenticate" : function () {
		    // TODO - receber um token do backend e armazenar na store corretamente as coisas.
		    store.commit('authenticate', {id: 999,username: this.username, token: 'tokenTeste'});
        axios.get('http://localhost:8000/usucontroller/getusers', {params: { username: this.username, password: this.password}})
            .then(response => {
                // JSON responses are automatically parsed.
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
	
			// TODO - if( correctUserAndPass). Falta implementar
		if(true) {
			this.$router.push('dashboard')	
		}
		} 
	},
    template: `<div id="login-window">
       <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <div class="box">
                        <figure class="avatar">
                            <img src="TrekkLogo.png">
                        </figure>
                        <form action=""> <!-- TODO - improvisado por enquanto, mas aqui deve validar o login -->
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" v-model="username" type="text" placeholder="Your Username" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" v-model="password"  type="password" placeholder="Your Password">
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
                            </div>
                            <!-- TODO - improvisado. Fazer direito a validacao depois usando o action desse form-->
                            <Button v-on:click='authenticate()' class="button is-block is-info is-large is-fullwidth login-button">Login</Button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
    </section>  
    </div>`
}
