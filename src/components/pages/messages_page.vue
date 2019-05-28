<template>
  <div>
    <header-main/>
    <div>
      <h3>Messages List</h3>
        <div class="messages-panel">
          <div class="panel-list-message">
            <div class="sended-message">
              <ul>
                <li @click="viewMessage(message.id)" v-for="message in sendedMessages" :key="message.id">{{message.subject}}</li>
              </ul>
            </div>
            <div class="retreive-message">
              <ul>
                <li @click="viewMessage(message.id)" v-for="message in retrievedMessages" :key="message.id">{{message.subject}}</li>
              </ul>
            </div>
          </div>
          <div class="message-content">
            {{currentMessage}}
          </div>
        </div>
      <div class="new-message">
        <form @submit.prevent="sendMessage()">
          <input  class="search-input" v-model="newMessage.user_to" placeholder="to"/>
          <input  class="search-input" v-model="newMessage.subject" placeholder="Subject"/>
          <textarea  class="search-input" v-model="newMessage.content">Content</textarea>
          <input type="submit"  class="button-wikiquiz"/>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  import HeaderMain from "../header_main";
  export default {
    name: "message_page",
    components: {HeaderMain},
    data() {
      return {
        currentMessage : "No message selected",
        retrievedMessages: [],
        sendedMessages: [],
        newMessage: {user_from: this.$store.getters.user.id, user_to: null, content: null, subject: null}

      }
    },
    mounted() {
      this.getMessage()
    },
    methods: {
      getMessage() {
        this.$api.getMessages()
        .then(resp =>
        {
          this.retrievedMessages = resp.filter(m => m.user_to === this.$store.getters.user.id);
          this.sendedMessages = resp.filter(m => m.user_from === this.$store.getters.user.id)
        }
        )
      },
      viewMessage(id) {
        this.$api.getMessage(id)
        .then(resp => this.currentMessage = resp.content)
      },
      sendMessage() {
        this.$api.postMessage(this.newMessage).then(resp => this.getMessage())
      }
    }
  }
</script>

<style scoped>

</style>