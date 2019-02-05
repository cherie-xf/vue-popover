<template>
  <transition name="fade">
    <div class="vu-popover" @mouseenter="show" @mouseleave="hide" v-if="isShow" :style="styleObject">
      <div class="popover-container">{{content}}</div>
    </div>
  </transition>
</template>

<script>
/**
 * popover component
 * =================================
 * parent element with class .vu-popover-target for calculating position (required)
 * props:
 * 1) trigger: controll slider show or hide (required)
 * 2) content: popover content (optional)
 * 3) title:  content of popover title (optional)
 */
export default {
  name: "vu-popover",
  props: ["content", 'target', 'trigger'],
  data: function() {
    return {
      styleObject: {
        color: "red"
      }
    };
  },
  computed: {
    isShow: function(){
      return this.trigger;
    }
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      // this.isShow = false;
    }
  },
  updated: function() {
    // var targetContainer = this.$el.parents(".vu-popover-container");
  },
  watch: {
    isShow: function() {
      var targetElm = this.target;
      // var targetElm = this.$el.parentElement;
        if (targetElm) {
          var viewportOffset = targetElm.getBoundingClientRect();
          // these are relative to the viewport, i.e. the window
          // var top = viewportOffset.top;
          // var left = viewportOffset.left;
          var right = viewportOffset.right;
          var bottom = viewportOffset.bottom;
          this.styleObject.left = right + "px";
          this.styleObject.top = bottom + "px";
          this.styleObject.color = "green";
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vu-popover {
  position: absolute;
}
.popover-container {
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(52, 73, 94, 0.2);
  padding: 5px;
  border-radius: 5px;
  z-index: 998;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
