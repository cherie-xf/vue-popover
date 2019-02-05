<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="vu-popover-container">
      <span @mouseenter="mouseEnter($event)">test 1
        <vu-popover content="Welcome to Your Vue.js App" :trigger="showPopover" :target="popoverTarget"/>
      </span>
    </div>
  </div>
</template>

<script>
import vuPopover from "./components/vu-popover.vue";

export default {
  name: "app",
  components: {
    vuPopover
  },
  data: function() {
    return {
      showPopover: false,
      popoverTarget: null,
    };
  },
  methods: {
    mouseEnter: function(e) {
      this.popoverTarget =  e.target;
      this.showPopover = !this.showPopover;
    },
    mouseLeave: function() {
      // this.popoverTarget = null;
      // this.showPopover = false;
    }
  }
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
</style>
