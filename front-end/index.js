const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: LoginWindow,
	name : 'login'
    },
    {
        path: '/dashboard',
        component: DashboardWindow,
	name : 'dashboard'
    },
    {
        path: '/settings',
        component: SettingsWindow,
	name : 'settings'
    }
]

const router = new VueRouter({
    routes: routes
})

const store = new Vuex.Store({
  state: {
    currentUser: {
    	id: -1,
	username: '',
	token: '',
    }
  },
  mutations: {
     authenticate (state, {id, username, token}) {
     	state.currentUser.id = id;
     	state.currentUser.username = username;
     	state.currentUser.token = token;
     },
     cleanUser(state) {
     	state.currentUser = {}
     }
  }
})

const app = new Vue({
    router,
}).$mount('#app');
