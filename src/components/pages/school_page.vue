<template>
    <div class="school_page">
        <div @click="AddTeacher">Add teacher</div>
        <p>Liste des profs</p>
        <ul>
            <li v-for="teacher in teachers" :key="teacher.id">
                <span>{{teacher.username}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "school_page",
        data() {
            return {
                teachers: []
            }
        }
    }
</script>

<style scoped>

</style>