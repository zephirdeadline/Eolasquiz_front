<template>
    <div class="adminpanel">
        <router-link to="createquiz" class="ui primary button">
            Creer un quiz
        </router-link>
        <h2>Voici la list de vos quiz</h2>
        <div class="ui divided items">
            <div class="item" v-for="quiz in quizs" :key="quiz.id">
                <div class="image">
                    <img src="../../assets/quiz.jpg">
                </div>
                <div class="content">
                    <button class="ui circular close icon button" @click="deleteQuiz(quiz.id)"><i class="close icon"></i></button>
                    <a class="header"> {{quiz.name}}</a>
                    <div class="meta">
                        <span class="cinema">{{quiz.created_at}} - {{quiz.questions.length}} questions</span>
                    </div>
                    <div class="description">
                        <p>{{quiz.description}}</p>
                    </div>
                    <div class="extra">
                        <div class="ui right floated primary button" @click="editquiz(quiz.id)">
                            Update
                            <i class="right chevron icon"></i>
                        </div>
                        <div class="ui label "><i class="like icon">{{quiz.likes.length }}</i></div>
                    
                        <div class="ui label "><i class="thumbs down icon">{{quiz.dislikes.length }}</i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "admin",
    data () {
        return {
            quizs: [],

            headers:{ headers: {Authorization: this.$store.getters.getUser.token}}
        }
    },

    mounted() {
        
        this.$http.get('api/quiz/', this.headers).then( 
        Response => { 
            this.quizs = JSON.parse(Response.bodyText) 
            }, 
        Response => console.log(Response))
    
    },
    methods: {
        editquiz(id) {
            this.$router.push( {name: 'editquiz', params: { 'id': id }})
        },
        deleteQuiz(id) {
            this.$http.delete('api/quiz/'+id, this.headers).then(
                Response => {
                    console.log(Response)
                    this.quizs = this.quizs.filter((quiz) => quiz.id !== id)
                },
                Response => console.log(Response)
            )
        }
    }
}
</script>

<style>
.adminpanel{
    max-width: 600px;
    margin: auto;
}
.close {
    float: right
}
</style>
