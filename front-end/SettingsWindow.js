const SettingsWindow = {
    data: function() {
        return {
		passwordOld: "",
		passwordNew1: "",
		passwordNew2: ""
        }
    },
    created: function() {
    },

    methods: {
	    // TODO - essa funcao esta duplicada em DashboardWindow... Consertar depois passando tudo pra um componente separado.
	    "logout": function () {
		   store.commit('cleanUser')
		    this.$router.push('login')
	    },
	    "mudarSenha": function() {

		    // TODO - verificar se old password ta certo antes de atualizar senha.
		    // TODO - verificar se pass1 == pass2 antes de confirmar mudar senha. Se for diferente avisar user.
		   axios.post('http://localhost:8000/usucontroller/inserir', {
                    id: store.state.currentUser.id,
			name: store.state.currentUser.username,
			   senha: this.passwordNew1
		   })
                .then(function(response) {
                    console.log(response);
		})
                .catch(function(error) {
                    console.log(error);
                }) 
		    
		    
	    }
    },

    template: `<div id = 'dashboard-base'>
    <nav class="navbar is-fixed-top is-success" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" @click="() => this.$router.push('dashboard')">
          <img src="./TrekkLogo.png" alt="Welcome to Trekk!">
          <p class="trekk-title">Trekk</p>
        </a>
      </div>
      <div class="navbar-end">
        <a class="navbar-item is-pulled-right">
          <span class="icon" @click="() => this.$router.push('dashboard')">
            <i class="fas fa-home fa-2x" aria-hidden="true"></i>
          </span>
        </a>
	<a class="navbar-item is-pulled-right" >
          <span class="icon" @click="logout()">
            <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
          </span>
        </a>
      </div>
    </nav>
	<div id='mudar-senha'>
	<i class="fas fa-user fa-7x" id='profile-icon'></i>
	<h1 class="is-large"> Mudar senha </h1>
                        <form action=""> 
                            <div class="field">
                                <div class="control">
                                    <input class="input " v-model="passwordOld" type="text" placeholder="Your OLD password" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input " v-model="passwordNew1"  type="password" placeholder="Your NEW password">
                                </div>
                            </div>
 
                            <div class="field">
                                <div class="control">
                                    <input class="input " v-model="passwordNew2"  type="password" placeholder="Repeat NEW password">
                                </div>
                            </div>
			
				 <!-- TODO - ainda nao funciona -->
                            <Button v-on:click='mudarSenha()' class="button is-block is-info  is-fullwidth login-button">Mudar senha</Button>
                        </form>
	</div>
	</div>`
}
