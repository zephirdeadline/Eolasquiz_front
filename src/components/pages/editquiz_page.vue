<template>
<div class="editcontent">
    <div class="ui modal">
        <i class="close icon"></i>
        <div class="header">
            Modal Title
        </div>
        <div class="image content">
            
            <div class="description">
            Error during saving {{currentError}}
            </div>
        </div>
        <div class="actions">
            <div class="ui button" @click="hideModal">Cancel</div>
            <div class="ui button">OK</div>
        </div>
    </div>

    <form class="ui form" @submit.prevent id='form'>
         <h1><input type="text" class="title" name="title" :value="quiz.name" required/></h1>
         <label>Category</label><input type="text" name="category" :value="quiz.category" required/>
         <label>Description</label><input type="text" name="description"  :value="quiz.description" required/>
         <label>Difficulty</label><input type="number" name="difficulty" id="metadata" :value="quiz.difficulty" min="0" required/>
        <div class="field question" v-for="(question, index) in quiz.questions" :key="index">
            <div class="field">
                <button class="ui circular close icon button" @click="closeQuestion(index)"><i class="close icon"></i></button>
                <label>Question</label>
                <textarea rows="2" :name="index" required v-model="question.text"></textarea>
            </div>
            <hr/>
            <div class="field" v-for="(answer, indexanswer) in question.answers" :key="indexanswer">
              
                <button class="ui circular close icon button" @click="closeAnswer(index, indexanswer)"><i class="close icon"></i></button>
                <label>Answers</label> 
                <input class="ui input" :name="index+';'+indexanswer" type="text" v-model="answer.text" required/> 
                <div class="ui toggle checkbox">
                    <input :name="index+';a'" :value="index+';'+indexanswer" type="radio" v-if="answer.is_correct" checked>
                    <input :name="index+';a'" :value="index+';'+indexanswer" type="radio" v-else>
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
        <div v-if=" quiz.questions !== undefined && quiz.questions.length === 0 " @click="addquestion">
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
            currentError: "",
            headers:{ headers: {Authorization: this.$store.getters.getUser.token}}
        }
    },
    methods: {
        hideModal () {
            $('.ui.modal').modal('show');
        },
        closeAnswer(indexquestion, indexanswer)
        {
           
            this.$delete(this.quiz.questions[indexquestion].answers, indexanswer)
        },
        closeQuestion(indexquestion)
        {
         
            this.$delete(this.quiz.questions, indexquestion)
        },
        errorModal()
        {
            this.currentError = JSON.parse(Response.bodyText)
            $('.ui.modal').modal('show');
        },
        errorPostModal () {
            this.currentError = JSON.parse(Response.bodyText).fails[0].error
            $('.ui.modal').modal('show');
        },
        savequiz()
        {
            var form = document.getElementById('form');
            var isValidForm = form.checkValidity();
            if (!isValidForm)
                return 
            var formData = new FormData(form);
            var formArray = {}
            formData.forEach(function(value, key){
                formArray[key] = value
            });

            var quiz = {}
            quiz["name"] = formData.get("title"),
            quiz["category"] = formData.get('category'),
            quiz["difficulty"] = formData.get('difficulty'),
            quiz["description"] = formData.get('description')
            
            var questionToAdd = []
            Object.entries(formArray).forEach(([key, value]) => {
                var arrayOfKeyValue = key.split(';')
                 
                if (arrayOfKeyValue.length === 1){
                    questionToAdd.push(key)
                }
                
            })
            questionToAdd = questionToAdd.filter((q) => q !== 'category' && q !==  'title' && q !== 'difficulty' && q !== 'description')

            var questions = []
            questionToAdd.forEach((key) => {
                var answersKey = Object.entries(formArray).filter(([keyAnswer, keyValue]) => keyAnswer.match(new RegExp(key+";\\d", 'g')))
                var answers = []
                answersKey.forEach(k => {
                    answers.push({ text: k[1], is_correct: (formArray[key+';a'] === k[0]) ? true : false })
                    
                })
                var currentQuestion = {
                    text: formData.get(key),
                    answers: answers
                }
                questions.push(currentQuestion)

            })
            quiz["questions"] = questions
           
            this.$http.put('api/fullquiz/'+this.$route.params.id, quiz, this.headers).then(
                Response =>  this.$router.push({name: 'admin'}),
                Response => console.log(Response)
            )

            
        },
        addanswer(index, bool)
        {
            this.quiz.questions[index].answers.push({'text': '', is_correct: bool})
        },
        addquestion() {
            this.quiz.questions.push({'text': '', 'answers':[] })
            this.addanswer(this.quiz.questions.length -1, true)
            this.addanswer(this.quiz.questions.length -1, false)
        }

    },
    mounted () {
        this.$http.get('api/quiz/' + this.$route.params.id, this.headers ).then(Response => { this.quiz = JSON.parse(Response.bodyText)}, Response)
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

