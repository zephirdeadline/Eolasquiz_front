<template>
  <div
    id="example2"
    class="ui teal progress"
  >
    <div class="bar" />
    <div class="label">
      {{ Math.floor(progress*10)/10 }}% Done
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progressbar',
  props: ['label', 'progress'],
  watch: {
    progress() {
      this.udpateProgress();
    },
  },
  mounted() {
    this.udpateProgress();
  },
  methods: {
    udpateProgress() {
      $('#example2').progress({
        percent: this.progress,
      });
    },
  },
};
</script>

<style>

</style>
