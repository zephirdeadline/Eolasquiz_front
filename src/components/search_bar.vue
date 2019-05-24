<template>
  <div class="">
      <h1>Kaestio →</h1>
      <form
        method="GET"
        @submit="FindQuiz"
      >
        <div class="search-input">
        <input class="input"
          v-model="toFind"
          name="value"
          type="text"
          placeholder="Search..."
        />
        <i class="fas fa-search"></i>
          </div>
      </form>
    </div>
</template>

<script>
    export default {
        name: "search_bar",
        data() {
            return {
                toFind: '',
            }
        },
        methods: {
            FindQuiz(e) {
                e.preventDefault();
                this.$emit('FindQuiz', this.toFind);
            }
        }
    }
</script>

<style scoped>
  .fa-search{
    right: 0;
  }
  .input {
    border: none;
  }
  .search-input{
    width: 200px;
    border: 1px solid;
    border-color: transparent transparent #037aff transparent ;
  }
</style>