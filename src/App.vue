<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <span class="popover-target" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <vu-popover content="Welcome to Your Vue.js App" :trigger="showPopover"/>hover this to popover
    </span>
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
      showPopover: false
    };
  },
  methods: {
    mouseEnter: function() {
      console.log('mouse enter');
      this.showPopover = true;
    },
    mouseLeave: function() {
      this.showPopover = false;
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
  position: relative;
}
</style>
