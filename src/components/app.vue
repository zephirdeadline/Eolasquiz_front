
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
  body {
    font-family: "Roboto", "Lucida Grande", "DejaVu Sans", "Bitstream Vera Sans", Verdana, Arial, sans-serif;
    margin: 60px 0 0 0;
  }
  .ui.segment{

  }

  .item{
    text-decoration: none;
  }

  .active {
    color: blue !important;
  }

  .button-wikiquiz {
    border-radius: 20px;
    background-color: #037aff;
    color: white;
    border: none;
    font-size: x-large;
    padding: 10px 20px;
  }

  .button-wikiquiz:hover {
        background-color: #94caff;
        cursor: pointer;
    }

</style>
