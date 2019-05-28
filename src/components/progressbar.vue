<template>
  <div
          class="progress"
  >
    <div class="bar">
      {{ Math.floor(progress*10)/10 }}%
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Progressbar',
    props: ['label', 'progress'],
    data() {
      return {
        bar: null
      }
    },
    watch: {
      progress() {
        this.udpateProgress();
      },
    },
    mounted() {
      this.bar = document.getElementsByClassName("bar")[0];

      this.udpateProgress();
    },
    methods: {
      udpateProgress() {
        this.bar.style.width = this.progress + '%';
      },
    },
  };
</script>

<style>
  .progress {
    background-color: grey;
    border-radius: 10px;
    margin: 0 20px 0 20px;
  }

  .bar {
     width: 1%;
  height: 30px;
  background-color: #037aff;
  text-align: center; /* To center it horizontally (if you want) */
  line-height: 30px; /* To center it vertically */
  color: white;
    transition: all;
    transition-duration: 0.25s;
    border-radius: 10px ;
  }
</style>
