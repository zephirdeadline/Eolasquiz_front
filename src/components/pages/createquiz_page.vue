<template>
<div class="content">
    <header-main/>
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
         <h1><input type="text" class="title" name="title" placeholder="Title" required/></h1>
         <label>Category</label><input type="text" name="category" required/>
         <label>Description</label><input type="text" name="description" required/>
         <label>Difficulty</label><input type="number" name="difficulty" id="metadata" min="0" required/>
        <div class="field question" v-for="(question, index) in questions" :key="index">
            <div class="field">
                <!--Close question-->
                <button class="ui circular close icon button" @click="closeQuestion(index)"><i class="close icon"></i></button>
                <label>Question</label>
                <!--Text Question-->
                <textarea rows="2" :name="index" required></textarea>
            </div>
            <hr/>
            <div class="field" v-for="(answer, indexanswer) in question" :key="indexanswer">
                <!--Close answer-->
                <button class="ui circular close icon button" @click="closeAnswer(index, indexanswer)"><i class="close icon"></i></button>
                <label>Answers</label>
                <!--Text answer-->
                <input class="ui input" type="text" :name="index+';'+indexanswer" required/> 
                <div class="ui toggle checkbox">
                    <!--Is correct?-->
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
import HeaderMain from "../header_main";
export default {
    name: "editquiz",
    components: {HeaderMain},
    data () {
        return {
            quiz: {},
            questions: [['','']],
            currentError: "",
        }
    },
    methods: {
        hideModal () {
            $('.ui.modal').modal('show');
        },
        closeAnswer(indexquestion, indexanswer)
        {
            
            this.$delete(this.questions[indexquestion],indexanswer)
        },
        closeQuestion(indexquestion)
        {
           
            this.$delete(this.questions, indexquestion)
        },
        errorPostModal () {
            this.currentError = 'none'
            $('.ui.modal').modal('show');
        },
        savequiz ()
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
            this.$api.fullQuiz([quiz]).then(
                Response => this.$router.push({name: 'admin'})
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
.content {
    max-width: 600px;
    margin: auto;
}
.question {
    margin-top: 20px;
    padding: 20px;
    border-radius: 25px;
    background-color: #EEEEEE;
}
h1 {
    text-align: center
}
.sendform {
    text-align: center
}
.title {
    text-align: center;
    color: black;
}
.close {
    float: right
}
#metadata {
    margin-bottom: 20px
}
</style>

