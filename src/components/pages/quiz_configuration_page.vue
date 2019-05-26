<template>
    <div>
        <header-main/>
        <quiz_configurater class="configurator"/>
    </div>
</template>

<script>
import Quiz_configurater from "../quiz_configurater";
import HeaderMain from "../header_main";
export default {
    name: 'quiz',
    components: {HeaderMain, Quiz_configurater},
}
</script>


<style>
.configurator {
    width: 100% ;
}

</style>
