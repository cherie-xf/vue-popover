<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="vu-popover-container">
      <span v-popover="{ title: 'Happy Chinese New Year!' }">
        <button>I have popover(hover to see)</button>
        <div data-name="popover-content">
          <span>this is the popover content {{message}}</span>
          <vu-test color="purple"></vu-test>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import vPopover from "./popover.js";
import vuTest from "./components/vu-test.vue";

export default {
  name: "app",
  components: {
    vuTest
  },
  data: function() {
    return {
      message: new Date()
    };
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.popover-target {
  padding: 2px 8px;
  border: 1px solid #cccccc;
  background-color: bisque;
  border-radius: 5px;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popover-show {
  /* text-decoration-line: underline;
  text-decoration-style: dashed;
  text-decoration-color: #2c3e50; */
  border-bottom: 1px dashed black;
}

</style>
