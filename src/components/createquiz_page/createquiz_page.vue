<template>
<div class="editcontent">
   
    <form class="ui form" @submit.prevent id='form'>
         <h1><input type="text" class="title" name="title" placeholder="Title"/></h1>
         <label>Category</label><input type="text" name="category" />
         <label>Description</label><input type="text" name="description" />
         <label>Difficulty</label><input type="number" name="difficulty" id="metadata" />
        <div class="field question" v-for="(question, index) in questions" :key="index">
            <div class="field">
                <button class="ui circular close icon button" @click="closeQuestion(index)"><i class="close icon"></i></button>
                <label>Question</label>
                <textarea rows="2" :name="index"></textarea>
            </div>
            <hr/>
            <div class="field" v-for="(answer, indexanswer) in question" :key="indexanswer">
              
                <button class="ui circular close icon button" @click="closeAnswer(index, indexanswer)"><i class="close icon"></i></button>
                <label>Answers</label> 
                <input class="ui input" type="text" :name="index+';'+indexanswer"/> 
                <div class="ui toggle checkbox">
                    
                    <input :name="index+';a'" :value="index+';'+indexanswer" type="radio">
                    <label>is correct</label>
                </div>
                <div v-if="indexanswer === question.length - 1 " @click="addanswer(index, false)">
                    <i class="plus circle icon"> </i>add answer
                </div>
            </div>
            <div v-if="question.length === 0" @click="addanswer(index)">
                <i class="plus circle icon" > </i>add answer
            </div>
            <hr/>
            <div v-if="index === questions.length - 1" @click="addquestion">
                <i class="plus circle icon"></i>add question
            </div>
        </div>
        <div v-if="questions.length === 0 " @click="addquestion">
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
            questions: [['','']],


            headers:{ headers: {Authorization: this.$store.getters.getUser.token}}
        }
    },
    methods: {
        closeAnswer(indexquestion, indexanswer)
        {
            
            this.$delete(this.questions[indexquestion],indexanswer)
        },
        closeQuestion(indexquestion)
        {
           
            this.$delete(this.questions, indexquestion)
        },
        savequiz ()
        {
            var form = document.getElementById('form');
            var formData = new FormData(form);
            var formArray = {}
            formData.forEach(function(value, key){
                formArray[key] = value
            });
            var questionToAdd = []
            var answersToAdd = []

            Object.entries(formArray).forEach(([key, value]) => {
                var arrayOfKeyValue = key.split(';')
                 
                if (arrayOfKeyValue.length === 1){
                    questionToAdd.push(key)
                }
                else if( arrayOfKeyValue.length === 2 && arrayOfKeyValue[1] !== 'a'){
                    answersToAdd.push(key)
                }
            })
            questionToAdd = questionToAdd.filter((q) => q !== 'category' && q !==  'title' && q !== 'difficulty' && q !== 'description')

            var quizToSend = {
                "name": formData.get("title"),
                "category": formData.get('category'),
                "difficulty": formData.get('difficulty'),
                "description": formData.get('description')
            }
            this.$http.post('api/quiz/', [quizToSend], this.headers).then(
                Response => {
                    var quizId = JSON.parse(Response.bodyText).saved[0].id
                    var dataToSend = []
                    questionToAdd.forEach((key) => {
                        var currentQuestion = {
                            "text": formData.get(key),
                            "quiz": quizId
                        }
                        dataToSend.push(currentQuestion)

                    })
                    this.$http.post('api/question/', dataToSend, this.headers).then(
                        Response => {
                            var listQuestionSaved = JSON.parse(Response.bodyText).saved
                            var dataToSend = []
                            answersToAdd.forEach((key) => {
                                var tabKey = key.split(';')
                                console.log(formData.get(key[0]+";a")+ "        "+ key)
                                var currentAnswer = {
                                    "text": formData.get(key),
                                    "is_correct": (formData.get(key[0]+";a") === key) ? true : false,
                                    "question": listQuestionSaved.find((q) => { return q.text === formData.get(tabKey[0])}).id
                                }
                                dataToSend.push(currentAnswer)
                            })
                            this.$http.post('api/answer/', dataToSend, this.headers).then(
                                Response => console.log('ok!!'),
                                Response => console.log(Response)
                            )
                            this.$router.push('admin')

                        },
                        Response => console.log(Response)
                    )
                },
                Response => console.log(Response)
            )
            
            
        },
        addanswer(index)
        {
            this.questions[index].push('')
        },
        addquestion() {
            this.questions.push(['',''])
        }

    },
 
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

