import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/'


const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes:[
    {
      path: '/createquiz', component: require('./components/createquiz_page/createquiz_page').default, name: 'createquiz'
    },  
    {
      path: '/editquiz/:id', component: require('./components/editquiz_page/editquiz_page').default, name: 'editquiz'
    },  
    {
      path: '/admin', component: require('./components/admin_page/admin_page').default, name: 'admin'
    },   
    {
      path: '/test', component: require('./components/test_page/test_page.vue').default, name: 'test'
    }, 
    {
      path: "/quiz/:id", component: require('./components/quiz_configuration_page/quiz_configuration_page').default, name: 'quiz'
    },
    {
      path: "/welcome", component: require('./components/welcome_page/welcome_page.vue').default, name: "welcome"
    },
    {
      path: "/", component: require('./components/login_page/page_login.vue').default
    },
    ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(require('./components/app.vue').default)
})
