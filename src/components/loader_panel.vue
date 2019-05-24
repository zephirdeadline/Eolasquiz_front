<template>
  <div
              v-if="is_loading"
              class="loader"
      >
        <div class="content">
          <i class="fas fa-spinner"></i>
            Loading
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
  .content {
    text-align: center;

    line-height: 200px;
    height: 200px;
  }
  .fa-spinner {
       -webkit-animation:spin 1s linear infinite;
    -moz-animation:spin 1s linear infinite;
    animation:spin 1s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

</style>