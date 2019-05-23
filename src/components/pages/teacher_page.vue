<template>
    <div>
        <header-main />
        <div class="main-container">
        <div class="left-panel">
            <div class="item-panel" :class="{ active: currentLink === index }" @click="switchTo(index)" v-for="(item, index) in items" :key="index">
                <span class="item-content">{{item}}</span><span class="!!arrow"></span>
            </div>

        </div>
        <div class="content-center">
            <quiz_broadcaster v-show="currentLink === index_of('Broadcast a quiz')"/>

            <div v-show="currentLink === index_of('Overview')">
            last session overview
            </div>
             <div v-show="currentLink === index_of('create Student')">
                <create_student/>
             </div>

             <div v-show="currentLink === index_of('Dashboard')">
            Total quiz created:
            Create your own quiz to that take the certification teacher
             </div>

             <div v-show="currentLink === index_of('add class')">
                <add_class/>
             </div>

            <div v-show="currentLink === index_of('View results')">
                View results
            </div>
        </div>
    </div>
        </div>
</template>

<script>
    import HeaderMain from "../header_main";
    import Quiz_broadcaster from "../quiz_broadcaster";
    import Add_class from "../add_class";
    import Create_student from "../create_student";
    export default {
        name: "teacher_page",
        components: {Create_student, Add_class, Quiz_broadcaster, HeaderMain},
        data () {
            return {
                currentLink: 0,
                items: ['Broadcast a quiz', 'create Student', 'View results', 'Overview', 'add class' ]
            }
        },
        methods: {
            switchTo(index) {
                this.currentLink = index
            },
            index_of(str) {
                return this.items.indexOf(str)
            }
        }

    }
</script>

<style scoped>
    .arrow {
width: 0;
height: 0;
border-style: solid;
border-width: 109px 0 109px 188.8px;
border-color: transparent transparent transparent #007bff;
    }
    .item-content {
        padding: 10px;
    }
    .item-panel:hover {
        background-color: green;
        cursor: pointer;
    }
    .main-container {
        display: flex;
        flex-direction: row;
          -webkit-transition: flex 2s; /* Safari */
          transition: all 500ms ease-in-out;
        height: auto;
    }
    .active {
        background-color: rebeccapurple;
    }
    .left-panel {
        flex-direction: column;
    }
    .content-center {
        padding: 20px;
    }

</style>