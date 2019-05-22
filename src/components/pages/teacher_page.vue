<template>
    <div>
        <header-main />
        <div class="teacher_page">
            <div>Broadcast a quiz</div>
            <div>Dashboard</div>
            <div>Overview</div>
            <div>Send message to teacher</div>
            <div>add class
                <add_class/>
            </div>
        </div>
        <quiz_broadcaster/>
    </div>
</template>

<script>
    import HeaderMain from "../header_main";
    import Quiz_broadcaster from "../quiz_broadcaster";
    import Add_class from "./add_class";
    export default {
        name: "teacher_page",
        components: {Add_class, Quiz_broadcaster, HeaderMain},

    }
</script>

<style scoped>

</style>