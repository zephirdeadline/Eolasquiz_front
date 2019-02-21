import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueMaterial);
var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

//Vue.http.options.root = 'https://quizengine.w4pity.fr/'
Vue.http.options.root = 'http://127.0.0.1:8000/'

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes:[
    {
      path: '/result/:quizid', component: require('./components/result_page/result_page').default, name: 'result'
    }, 
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
      path: '/test/:id/:nbquestion/:uniqid', component: require('./components/test_page/test_page.vue').default, name: 'test'
    },
    {
      path: '/test/:id/:nbquestion', component: require('./components/test_page/test_page.vue').default, name: 'autotest'
    }, 
    {
      path: "/quiz/:id", component: require('./components/quiz_configuration_page/quiz_configuration_page').default, name: 'quiz'
    },
    {
      path: "/login", component: require('./components/login_page/page_login.vue').default, name: "login"
    },
    {
      path: "/", component: require('./components/welcome_page/welcome_page.vue').default, name: "welcome"
    },
    ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(require('./components/app.vue').default)
})
