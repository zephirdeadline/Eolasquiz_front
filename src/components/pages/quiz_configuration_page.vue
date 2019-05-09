<template>
    <div class="quiz_config">
        <div class="ui card">
            <div class="image"> 
                <img src="../../assets/quiz.jpg">
            </div>
            <div class="content">
                <a class="header">{{quiz.name}}</a>
                <div class="meta">
                <span class="date">{{quiz.created_at}}</span>
                </div>
                <div class="description">
                    {{ quiz.description }}
                </div>
            </div>
            <div class="extra content">
                <!-- <a>
                <i class="like icon" @click="Like(quiz.id)"></i>
                {{ quiz.likes.length }} <span v-if="isUserLikeQuiz(quiz)">with you</span>
                </a>
                <a>
                <i class="thumbs down icon"  @click="Dislike(quiz.id)"></i>
                {{ quiz.dislikes.length }} <span v-if="isUserDislikeQuiz(quiz)">with you</span>
                </a> -->
            </div>
        </div>

        <form class="ui form" @submit.prevent>
        <div class="field">
            <label for="">Nombre de questions</label>
            <input name="nb_questions" type="number" v-model="nb_question" placeholder="10" min="1"/>
        </div>
        
        <input class="ui button" type="submit" value="Tester!" @click="runtest()">
    </form>
    </div>
</template>

<script>
export default {
    name: 'quiz',
    data () {
        return {
            quiz: {},
            nb_question: 10,
            headers:{ headers: {Authorization: this.$store.getters.getUser.token}}
        }
    },

    methods:{
        getQuizFromServer(id) {
             this.$http.get('api/quiz/' + id).then(Response => this.quiz = JSON.parse(Response.bodyText), Response)
        },

        runtest() {
            var uniqid = require('uniqid')
            this.$router.push({name: "autotest", params: {id: this.quiz.id, nbquestion: this.nb_question }})
        }
    },
    
    mounted() {
         this.getQuizFromServer(this.$route.params.id)
    }
}
</script>


<style>
.quiz_config {
    margin: auto;
    text-align: center;
    max-width: 300px;
}

.card {
    text-align: center;
}

</style>
