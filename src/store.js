import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
    key: 'vuex', 
    storage: window.localStorage,
  })

const state = {
    user: {},
    quiz: {},
    quizConfig: {}
}

const modelState = {
    user: {},
    quiz: {},
    quizConfig: {}
}

const mutations = {
    CHANGE_USER: (state, user) => { state.user = user },
    SET_QUIZ: (state, quiz) => { state.quiz = quiz },
    SET_QUIZ_CONFIG: (state, config) => { state.quizConfig = config },
    CLEAR: (state) => {state.user = {}}
}

const getters = {
    getUser: state => state.user,
    getQuiz: state => state.quiz,
    getQuizConfig: state => state.quizConfig
}

const actions = {
    changeUser (store, user) { store.commit('CHANGE_USER', user) },
    setQuiz (store, quiz) { store.commit('SET_QUIZ', quiz)},
    setQuizConfig (store, config) {store.commit('SET_QUIZ_CONFIG', config)},
    clear (store) {store.commit('CLEAR')}
}

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true,
    plugins: [vuexLocalStorage.plugin]
})


export default store