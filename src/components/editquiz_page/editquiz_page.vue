<template>
<div class="editcontent">
   
    <form class="ui form" @submit.prevent id='form'>
         <h1><input type="text" class="title" name="title" :value="quiz.name"/></h1>
         <label>Category</label><input type="text" name="category" :value="quiz.category"/>
         <label>Description</label><input type="text" name="description"  :value="quiz.description"/>
         <label>Difficulty</label><input type="number" name="difficulty" id="metadata" :value="quiz.difficulty"/>
        <div class="field question" v-for="(question, index) in quiz.questions" :key="index">
            <div class="field">
                <button class="ui circular close icon button" @click="closeQuestion(index, question.id)"><i class="close icon"></i></button>
                <label>Question</label>
                <textarea rows="2" :name="index+';'+question.id" :value="question.text"></textarea>
            </div>
            <hr/>
            <div class="field" v-for="(answer, indexanswer) in question.answers" :key="indexanswer">
              
                <button class="ui circular close icon button" @click="closeAnswer(index, indexanswer, answer.id)"><i class="close icon"></i></button>
                <label>Answers</label> 
                <input class="ui input" :name="index+';'+question.id+';'+indexanswer+';'+answer.id" type="text" :value="answer.text"/> 
                <div class="ui toggle checkbox">
                    <input :name="index+'a'" :value="indexanswer" type="radio" v-if="answer.is_correct" checked>
                    <input :name="index+'a'" :value="indexanswer" type="radio" v-else>
                    <label>is correct</label>
                </div>
                <div v-if="indexanswer === question.answers.length - 1 " @click="addanswer(index, false)">
                    <i class="plus circle icon"> </i>add answer
                </div>
            </div>
            <div v-if="question.answers.length === 0" @click="addanswer(index)">
                <i class="plus circle icon" > </i>add answer
            </div>
            <hr/>
            <div v-if="index === quiz.questions.length - 1" @click="addquestion">
                <i class="plus circle icon"></i>add question
            </div>
        </div>
        <div v-if="quiz.questions.length === 0 " @click="addquestion">
                <i class="plus circle icon"></i>add question
        </div>
        <div class="sendform">
            <button class="ui button primary" @click="savequiz">Terminé!</button>
        </div>
    </form>
</div>
    
</template>

<script>
export default {
    name: "editquiz",
    data () {
        return {
            quiz: {},
            questionToDelete: [],
            answerToDelete:[],

            headers:{ headers: {Authorization: this.$store.getters.getUser.token}}
        }
    },
    methods: {
        closeAnswer(indexquestion, indexanswer, id)
        {
            if (id !== "-1")
                this.answerToDelete.push(id)
            this.$delete(this.quiz.questions[indexquestion].answers,indexanswer)
        },
        closeQuestion(indexquestion, id)
        {
            if (id !== "-1")
                this.questionToDelete.push(id)
            this.$delete(this.quiz.questions, indexquestion)
        },
        savequiz()
        {
            var form = document.getElementById('form');
            var formData = new FormData(form);
            var formArray = {}
            formData.forEach(function(value, key){
                formArray[key] = value
            });
            console.log(formArray)

            var questionToUpdate = []
            var questionToAdd = []
            var answerToUpdate = []
            var answerToAdd = []

            Object.entries(formArray).forEach(([key, value]) => {
                 var arrayOfKeyValue = key.split(';')
                 
                if (arrayOfKeyValue.length === 2){
                    if (arrayOfKeyValue[1] == -1){
                        questionToAdd.push(key)
                    }
                    else {
                        questionToUpdate.push(key)
                    }
                }
                else if( arrayOfKeyValue.length === 4){
                    if (arrayOfKeyValue[3] == -1){
                        answerToAdd.push(key)
                    }
                    else {
                        answerToUpdate.push(key)
                    }
                }
            })
            questionToUpdate.forEach((key) => {
                var arrayOfKeyValue = key.split(';')
                var dataToSend = {
                    "text": formArray[key],
	                "quiz": this.quiz.id
                    
                }
                this.$http.put('api/question/'+arrayOfKeyValue[1], dataToSend, this.headers).then(
                    Response => Response,
                    Response => console.log(Response)
                )
            }, this)

            var dataToSend = []
            questionToAdd.forEach((key) => {
                var arrayOfKeyValue = key.split(';')
                var currentQuestion = {
                    "text": formArray[key],
	                "quiz": this.quiz.id
                    
                }
                dataToSend.push(currentQuestion)
            }, this)

            this.$http.post('api/question/', dataToSend, this.headers).then(
                    Response => {
                        var newquestions = JSON.parse(Response.bodyText).saved
                       
                        var dataToSend = []
                        answerToAdd.forEach((key) => {
                            var arrayOfKeyValue = key.split(';')
                            console.log(formArray[arrayOfKeyValue[0]+";"+arrayOfKeyValue[1]])
                            var currentAnswer = {
                                "text": formArray[key],
                                "is_correct": (formData.get(arrayOfKeyValue[0]+'a') === arrayOfKeyValue[2]) ? true : false,
                                "question": (arrayOfKeyValue[1] === '-1') ? newquestions.find((q) => q.text === formArray[arrayOfKeyValue[0]+";"+arrayOfKeyValue[1]]).id : arrayOfKeyValue[1]
                            }
                            dataToSend.push(currentAnswer)
                        }, this)
                        this.$http.post('api/answer/', dataToSend, this.headers).then(
                                Response => Response,
                                Response => console.log(Response)
                            )
                        
                    },
                    Response => console.log(Response)
                )

            answerToUpdate.forEach((key) => {
                var arrayOfKeyValue = key.split(';')
                var dataToSend = {
                    "text": formArray[key],
                    "is_correct": (formData.get(arrayOfKeyValue[0]+'a') === arrayOfKeyValue[2]) ? true : false,
                    "question": arrayOfKeyValue[1]
                }
                
                this.$http.put('api/answer/'+arrayOfKeyValue[3], dataToSend, this.headers ).then(
                    Response => Response,
                    Response => console.log(Response)
                )
            }, this)


            this.answerToDelete.forEach((a) => {
                this.$http.delete('api/answer/'+a, this.headers).then(
                    Response => {console.log(Response); this.answerToDelete = []},
                    Response => console.log(Response)
                )
            })
            this.questionToDelete.forEach((a) => {
                this.$http.delete('api/question/'+a, this.headers).then(
                    Response => {console.log(Response); this.questionToDelete = []},
                    Response => console.log(Response)
                )
            })
            
            var dataToSend = {
                    "name": formData.get("title"),
                    "category": formData.get('category'),
                    "difficulty": formData.get('difficulty'),
                    "description": formData.get('description')
            }
            this.$http.put('api/quiz/'+this.quiz.id, dataToSend, this.headers).then(
                Response => Response,
                Response => console.log(Response)
            )

            
            
        },
        addanswer(index, bool)
        {
            this.quiz.questions[index].answers.push({'text': '', is_correct: bool, id:-1})
        },
        addquestion() {
            this.quiz.questions.push({'text': '', 'answers':[], 'id':-1 })
            this.addanswer(this.quiz.questions.length -1, true)
            this.addanswer(this.quiz.questions.length -1, false)
        }

    },
    mounted () {
        this.$http.get('api/quiz/' + this.$route.params.id, this.headers ).then(Response => { this.quiz = JSON.parse(Response.bodyText)}, console.log(Response))
    }
}
</script>

<style>
.editcontent {
    max-width: 600px;
    margin: auto
}
.question {
    margin-top: 20px;
    padding: 20px;
    border-radius: 25px;
    background-color: #EEEEEE
}
h1 {
    text-align: center
}
.sendform {
    text-align: center
}
.title {
    text-align: center
}
.close {
    float: right
}
#metadata {
    margin-bottom: 20px
}
</style>

