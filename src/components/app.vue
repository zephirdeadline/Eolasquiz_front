
<template>
  <div>
    <div class="ui segment">
      <router-view />
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import Header_main from './header_main';
import apiManager from '../network_manager';

Vue.prototype.$api = new apiManager();

export default {
  components: { Header_main },

};
</script>

<style>
  .item{
    color: aliceblue !important
  }
  .ui.segment{

    background-color: rgb(59, 59, 59)
  }


</style>
