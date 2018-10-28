<template>
    <div class="ui teal progress" id="example2">
  <div class="bar"></div>
  <div class="label">{{progress}}% Done</div>
</div>
</template>

<script>
export default {
    name:"progressbar",
    props:["label", "progress"],
    methods:{
        udpateProgress(){
        $("#example2").progress({
            percent: this.progress
        });
        }
    },
    watch:{
        progress(newVal){
        this.udpateProgress() 
        }
    },
    mounted(){
        this.udpateProgress()
    }
}
</script>

<style>

</style>

