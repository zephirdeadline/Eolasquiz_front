<template>
    <div>
        <header-main/>
        <div class="content game center aligned">
                <modal @changeQuiz="changeQuiz" :isvisible="displayModal"/>
                <form @submit.prevent="viewscore" v-if="!displayScore" id="form">
                    <h1>{{quiz.name}}</h1>

                    <progressbar label="zdeedz" :progress="progress"/>

                    <div v-for="question in quiz.questions" :key="question.id">

                        <card_question_run :question="question" :current-question="currentQuestion"/>

                    </div>
                    <div class="next" v-if="!showDisplayEnd">
                        <button @click.prevent="nextQuestion" class="button-wikiquiz">Next</button>
                    </div>
                    <div class="score next" v-else>
                        <input type="submit" value="Voir score" class="button-wikiquiz">
                    </div>
                </form>
                <display_score
                        v-else
                        :result="result"
                        :result-saved="resultSaved"
                        :uniq-id="uniqId"/>

            </div>

        </div>
</template>



<script>
    import Progressbar from '../progressbar'
    import uniqid from 'uniqid'
    import Display_score from "./display_score";
    import Card_question_run from "./card_question_run";
    import HeaderMain from "../header_main";
    import Modal from "../modal";

    export default {
        name: 'test',
        components:{
            Modal,
            HeaderMain,
            Card_question_run,
            Display_score,
            Progressbar
        },
        data () {
            return {
                quiz: {},
                displayScore: false,
                currentQuestion: 0,
                currentIndex: 0,
                displayEnd: false,
                result: {},
                progress: 0,
                uniqId: "",
                status: "Ready",
                resultSaved: false,
                displayModal: false

            }
        },

        computed: {
            showDisplayEnd () {
                return this.displayEnd
            }
        },

        mounted () {


            if (this.$route.params.uniqid === undefined)
                this.uniqId = this.generateUniqueId();
            else
                this.uniqId = this.$route.params.uniqid;

            this.$api.resultId(this.uniqId)
                    .then((resp) => { this.displayModal = true; });
            this.$api.quiz(this.$route.params.id)
                    .then(resp => {
                                this.quiz = resp;
                                var questions = this.quiz.questions.sort(() => {
                                    return 0.5 - Math.random();
                                });
                                this.quiz.questions = questions.slice(0, this.$route.params.nbquestion);
                                this.currentQuestion = questions[0].id;
                            }
                    )
        },

        methods: {
            changeQuiz () {
                this.displayModal = false
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

                this.$api.postResult([{score: this.result.score, quiz: this.quiz.id, uniq_id: this.uniqId}]).then(
                        (resp) => { this.resultSaved = true; }
                )

            }
        }
    }
</script>

<style scoped>


    .game {
        max-width: 1200px;
        margin: auto;
    }

    label {
    }

    h1 {
        text-align: center
    }
    .score , .next{
        text-align: center

    }
    .score{
        margin-top: 20px;
    }
    .displayresult {
        color: #FF0000;
        text-align: center
    }
    .correction {
        color: black;
    }
</style>