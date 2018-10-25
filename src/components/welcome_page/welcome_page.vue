<template>
<div class="title">

    <h1 class="ui center aligned icon header">
        <i class="circular users icon"></i>
        Quizz Engine
    </h1>
    <div class="quiz">
        
        <div class="ui card " id="card" v-for="quiz in quizs" :key="quiz.id">
            <div class="image"> 
                <img src="../../assets/quiz.jpg">
            </div>
            <div class="content">
                <router-link :to="{ name: 'quiz', params: { id: quiz.id }}" class="header">{{quiz.name}}</router-link>
                <div class="meta">
                <span class="date">{{quiz.created_at}}</span>
                </div>
                <div class="description">
                    {{ quiz.description }}
                </div>
            </div>
            <div class="extra content">
                <a>
                <i class="like icon" @click="Like(quiz.id)"></i>
                {{ quiz.likes.length }} <span v-if="isUserLikeQuiz(quiz)">with you</span>
                </a>
                <a>
                <i class="thumbs down icon"  @click="Dislike(quiz.id)"></i>
                {{ quiz.dislikes.length }} <span v-if="isUserDislikeQuiz(quiz)">with you</span>
                </a>
                
            </div>
        </div>
    </div>
</div>
</template>


<script>
import Vuex from 'vuex'

export default {
    name: "welcome",

    data () {
        return {
            quizs: [],
            headers:{ headers: {Authorization: this.$store.getters.getUser.token}}
        }
    },
    
    computed: {
       
    },

    methods: {
        Like (id) {
            this.$http.post('api/like/', [{ "quiz": id }], this.headers).then(this.getQuizs, Response => console.log(Response))
        },
        Dislike (id) {
            this.$http.post('api/dislike/', [{ quiz: id }], this.headers).then(this.getQuizs, Response => console.log(Response))
        },
        isUserLikeQuiz (quiz) {
            return quiz.likes.find(like => like.user === this.$store.getters.getUser.id )
        },
        isUserDislikeQuiz (quiz) {
            return quiz.dislikes.find(like => like.user === this.$store.getters.getUser.id )
        },
        getQuizs () {
            this.$http.get('api/quiz/', this.headers).then( 
            Response => { 
                this.quizs = JSON.parse(Response.bodyText) 
                // this.$store.dispatch('setQuizs', this.quizs)
                }, 
            Response => console.log(Response))
        }
    },

    mounted () {
        console.log(this.$store.state)
        this.getQuizs()

    }
}
</script>


<style>
.thumbs.down.icon
{
    margin-left: 5px
}
.quiz {
    display: flex;
   
}
#card {
    margin: 20px;
}
h1 {
    text-align: center
}
</style>
