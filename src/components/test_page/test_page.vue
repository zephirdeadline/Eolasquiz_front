<template>
    <div class="content">
        <div class="ui modal">
            <i class="close icon"></i>
            <div class="header">
                Warning
            </div>
            <div class="image content">
                
                <div class="description">
                This quiz instance is already done
                </div>
            </div>
            <div class="actions">
                <div class="ui button" @click="changeQuiz">Give me another!</div>
            </div>
        </div>
        <form class='ui form' @submit.prevent="viewscore" v-if="!displayScore" id="form">
            <h1>{{quiz.name}}</h1>

            <progressbar label="zdeedz" :progress="progress"/>

            <div v-for="question in quiz.questions" :key="question.id">   
                <div class="ui bottom attached  tab segment" :class="isVisible(question.id)">
                   
                    <div class="grouped fields">
                    <label>{{question.text}}</label>
                        
                        <div v-for="answer in question.answers" :key="answer.id">
                            <div class="field">
                                <label ><input type="radio" class='ui radio checkbox' :value="answer.id" :name="question.id" />
                                {{answer.text}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="next">
                        <button @click.prevent="nextQuestion" class="ui primary button ">Next</button>
                    </div>
                
                </div>
            </div>
            <div class="ui bottom attached  tab segment score" :class="showDisplayEnd ? 'active': ''">
                <input type="submit" value="Voir score" class="ui blue basic button ">
            </div>
        </form>
        <div v-else class="displayresult">
            <h3>Félicitations!</h3>
            <h3>Tu as obtenu un score de:</h3>
            <h2>{{ result.score }}/20</h2>
            <p style="color: black">Voici la correction de tes erreurs:</p>
            <div v-for="answer in result.badAnswers" :key="answer.id" class="correction">
                {{answer}}
            </div>
            <p v-if="resultSaved">Result available to : {{uniqId}}</p>
        </div>
 
    </div>
</template>



<script>
import Progressbar from '../progressbar'
import uniqid from 'uniqid'

export default {
    name: 'test',
    components:{
        Progressbar
    },
    data () {
        return {
            quiz: {},
            displayScore: false,
            currentQuestion: 0,
            currentIndex: 0,
            displayEnd: false,
            headers: { headers: {Authorization: this.$store.getters.getUser.token}},
            result: {},
            progress: 0,
            uniqId: "",
            status: "Ready",
            resultSaved: false
        }
    },

    mounted () {
        if (this.$route.params.uniqid === undefined)
            this.uniqId = this.generateUniqueId()
        else
            this.uniqId = this.$route.params.uniqid

        console.log(this.uniqId)
        this.$http.get('api/result/'+this.uniqId).then(
            Response => $('.ui.modal').modal('show'),
            Response => console.log(Response)
        )
        this.$http.get("api/quiz/"+ this.$route.params.id).then(
            Response => {
                this.quiz = JSON.parse(Response.bodyText)
                var questions = this.quiz.questions.sort(() => { return 0.5 - Math.random() });
                this.quiz.questions = questions.slice(0, this.$route.params.nbquestion)
                this.currentQuestion = questions[0].id
            },
            Response => Response
        )

        
        
    },

    computed: {
        showDisplayEnd () {
            return this.displayEnd
        }
    },

    methods: {
        changeQuiz () {
            console.log('click')
            this.hideModal()
            this.uniqId = this.generateUniqueId()
        },

        generateUniqueId (){
            return uniqid('auto-')
        },

        hideModal () {
            $('.ui.modal').modal('hide');
        },
        
        isVisible (id) {
            if (id === this.currentQuestion)
                return 'active'
            else
                return ''
        },

        nextQuestion() {
            this.currentIndex ++
            if (this.currentIndex >= this.quiz.questions.length){
                this.displayEnd = true
                this.currentQuestion = -1
                this.progress = this.currentIndex * 100 / this.quiz.questions.length
            }
            else {
                this.currentQuestion = this.quiz.questions[this.currentIndex].id 
                this.progress = this.currentIndex * 100 / this.quiz.questions.length
            }
                
        },

        viewscore() {
            this.displayScore = true
            var form = document.getElementById('form');
            var formData = new FormData(form);
            var formArray = {}
            formData.forEach(function(value, key){
                formArray[key] = value
            });
            var badAnswers = []
            var listIdQuestion = []
            this.quiz.questions.forEach(question => {
                listIdQuestion.push(question.id)
            });
            Object.entries(formArray).forEach(([key, value]) => {
                    var quest = this.quiz.questions.find((q) => q.id.toString() === key )
                    delete listIdQuestion[listIdQuestion.findIndex( id => id === quest.id)]
                    var idGoodAnswer = quest.answers.find((answer) => answer.is_correct === true)
                    if (value !== idGoodAnswer.id.toString())
                    {   
                        badAnswers.push(quest.text + " est " + idGoodAnswer.text)
                    }
                    
                }
            )
            listIdQuestion.forEach(idQuestion => {
                var question = this.quiz.questions.find(e => e.id === idQuestion)
                var answer = question.answers.find(e => e.is_correct)
                badAnswers.push(question.text + " est " + answer.text)
            });
            
            this.result.badAnswers = badAnswers
            this.result.score = Math.floor(((this.quiz.questions.length - badAnswers.length) * 20 / this.quiz.questions.length)*10)/10
            
            this.$http.post('api/result/', [{score: this.result.score, quiz: this.quiz.id, uniq_id: this.uniqId}]).then(
                Response => this.resultSaved = true,
                Response => console.log(Response)   
            )
              
        }
    }
}
</script>

<style>
.content {
    max-width: 1200px;
    margin: auto;
}
h1 {
    text-align: center
}
 .score , .next{
     text-align: center
 }
 .displayresult {
     color: #FF0000;
     text-align: center
 }
 .correction {
     color: black;
 }
</style>
[…]