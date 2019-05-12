<template>
  <div
              v-if="is_loading"
              id="loader"
              class="ui segment"
      >
        <div class="ui active inverted dimmer">
          <div class="ui text loader">
            Loading
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        name: "loader_panel",
        props: ['is_loading']
    }
</script>

<style scoped>

</style>