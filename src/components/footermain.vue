<template>
  <div class="footer">
      <div class="footer-menu">
        <div class="column">
          <h4 class="ui header">Community</h4>
          <div class="list">
            <a class="item" href="#" target="_blank">Help Translate</a>
            <a class="item" href="#" target="_blank">Submit an Issue</a>
            <a class="item" href="#" target="_blank">Join our Chat</a>
            <a class="item" href="#" target="_blank">CLA</a>
          </div>
        </div>
        <div class="column">
          <h4 class="ui header">Network</h4>
          <div class="ui link list">
            <a class="item" href="#" target="_blank">GitHub Repo</a>
            <a class="item" href="#" target="_blank">User Forums</a>
            <a href="/discover" class="item">Get QuizEngine</a>
            <a class="item" href="#">0.x Docs</a>
          </div>
        </div>
        <div class="column">
          <h4 class="ui header">Help Preserve This Project</h4>
          <p> Support for the continued development of Kaestio comes directly from the community.</p>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="7ZAF2Q8DBZAQL">
            <button type="submit" class="button-wikiquiz">Donate Today</button>
          </form>
        </div>
      </div>
      <hr class="line"/>
      <div class="bottom">

        <div class="heart">❤️</div>
        <div>
        <a class="item" href="#" target="_blank">Free & Open Source (MIT)</a>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "footermain"
  }
</script>

<style scoped>
  .line {
    width: 90%;
    box-shadow: #007bff 0 0 5px 2px;
  }
  .footer {
    margin-top: 40px;
    padding-bottom: 20px;
    background-color: #2e7ab2;
    display: flex;
    flex-direction: column;
    box-shadow: #5d5d5d 0 0 30px 2px;
  }
  .footer-menu {
    display: flex;
    flex-wrap: wrap;
  }
  .list {
    display: flex;
    flex-direction: column;
  }
  .column {
    flex-grow: 1;
    text-align: center;
  }
  .list > a:hover {
    color: white;
  }
  .bottom {
    text-align: center;
  }

</style>