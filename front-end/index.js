const routes = [
	{ path: '/', redirect: '/login'},  
	{ path: '/login', component: LoginWindow },
  	{ path: '/dashboard', component: DashboardWindow }
]

const router = new VueRouter({
	routes: routes
})

const app = new Vue({
	router,      
    }).$mount('#app');
