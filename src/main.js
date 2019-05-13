/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueMaterial);

// Vue.http.options.root = 'https://quizengine.w4pity.fr/'
Vue.http.options.root = 'http://127.0.0.1:8000/';

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/result/:quizid', component: require('./components/pages/result_page').default, name: 'result',
    },
    {
      path: '/createquiz', component: require('./components/pages/createquiz_page').default, name: 'createquiz',
    },
    {
      path: '/editquiz/:id', component: require('./components/pages/editquiz_page').default, name: 'editquiz',
    },
    {
      path: '/admin', component: require('./components/pages/admin_page').default, name: 'admin',
    },
    {
      path: '/test/:id/:nbquestion/:uniqid', component: require('./components/pages/test_page.vue').default, name: 'test',
    },
    {
      path: '/test/:id/:nbquestion', component: require('./components/pages/test_page.vue').default, name: 'autotest',
    },
    {
      path: '/quiz/:id', component: require('./components/pages/quiz_configuration_page').default, name: 'quiz',
    },
    {
      path: '/login', component: require('./components/pages/page_login.vue').default, name: 'login',
    },
    {
      path: '/discover', component: require('./components/pages/discover_page.vue').default, name: 'discover',
    },
    {
      path: '/', component: require('./components/pages/welcome_page.vue').default, name: 'welcome',
    },
    {
      path: '/profile', component: require('./components/pages/profile_page.vue').default, name: 'profile',
    },
    {
      path: '/student', component: require('./components/pages/student_page.vue').default, name: 'student',
    },
    {
      path: '/teacher', component: require('./components/pages/teacher_page.vue').default, name: 'teacher',
    },
    {
      path: '/school', component: require('./components/pages/school_page.vue').default, name: 'school',
    },
    {
      path: '/paiement', component: require('./components/pages/paiement_page.vue').default, name: 'paiement',
    },
  ],
});

new Vue({
  el: '#app',
  router,
  store: require('./store').default,
  render: h => h(require('./components/app.vue').default),
});
