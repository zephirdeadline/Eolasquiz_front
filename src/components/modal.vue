<template>
  <div id="modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close" @click="emitChangeQuiz()">&times;</span>
                        <h2>Modal Header</h2>
                    </div>
                    <div class="modal-body">
                        <p>This quiz instance is already done</p>
                        <button @click="emitChangeQuiz()" class="button-wikiquiz">Give me an other!</button>
                    </div>
                </div>
            </div>
</template>

<script>
  export default {
    name: "modal",
    props: ['isvisible'],
    data() {
      return {
         modal: null,
        span: null
      }
    },
    watch: {
      isvisible() {
        if(this.isvisible) {
          this.modal.style.display = "block";
        } else {
          this.modal.style.display = "none";
        }
      }
    },
    methods: {
      emitChangeQuiz() {
        this.$emit('changeQuiz')
      }
    },
    mounted () {
      this.modal = document.getElementById("modal");

      // Get the <span> element that closes the modal
      this.span = document.getElementsByClassName("close")[0];

      window.onclick = function (event) {
        if (event.target === this.modal) {
          this.modal.style.display = "none";
        }
      };
    }
  }
</script>

<style scoped>
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
    }

    /* Add Animation */
    @-webkit-keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    /* The Close Button */
    .close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .modal-header {
        padding: 2px 16px;
        background-color: #94caff;
        color: white;
    }

    .modal-body {padding: 2px 16px;}
</style>