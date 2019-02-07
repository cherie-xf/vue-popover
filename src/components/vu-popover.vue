<template>
  <!-- <transition name="fade"> -->
  <div class="vu-popover" v-if="isShow" :style="styleObject" ref="vu-popover">
    <div class="popover-container">
      <div class="popover-title" v-if="title" v-html="title"></div>
      <slot></slot>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
/**
 * popover component
 * =================================
 * props:
 * 1) trigger: controll slider show or hide (required)
 * 2) title:  content of popover title (optional)
 * 3) appendTo: append to container className(optional for calculate position)
 *
 */
export default {
  name: "vu-popover",
  props: ["title", "target", "trigger", "appendTo"],
  data: function() {
    return {
      styleObject: {
        color: "red"
      },
      timeoutId: 0,
      position: ["bottom", "right"]
    };
  },
  methods: {
    getClosest(elem, selector) {
      for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
      }
      return null;
    },
    setPosition() {
      // container
      var container = null;
      if (this.appendTo) {
        container = this.getClosest(this.target, "." + this.appendTo);
        if (!container) {
          container = document.body;
        }
      } else {
        container = document.body;
      }
      // these are relative to the viewport, i.e. the window
      var containerRect = container.getBoundingClientRect();
      // target
      var targetElm = this.target;
      if (targetElm) {
        var targetRect = targetElm.getBoundingClientRect();

        // popover
        var popoverSize = {};
        popoverSize.width = this.$el.offsetWidth || 0;
        popoverSize.height = this.$el.offsetHeight || 0;
        console.log('popover size', popoverSize.width, popoverSize.height)

        // calculation
        if (targetRect.bottom + popoverSize.height < containerRect.bottom) {
          this.position[0] = "bottom";
        } else if (targetRect.top - popoverSize.height > containerRect.top) {
          this.position[0] = "top";
        } else {
          this.position[0] = "center";
        }

        if (targetRect.right + popoverSize.width < containerRect.right) {
          this.position[1] = "right";
        } else if (targetRect.left - popoverSize.width > containerRect.left) {
          this.position[1] = "left";
        } else {
          this.position[1] = "center";
        }

        if (this.position[0] === "center" && this.position[1] === "center") {
          this.position[0] = "bottom"; // better have vertical scroller
        }
        console.log("postion", this.position[0], this.position[1])
        switch (this.position[0]) {
          case "bottom":
            this.styleObject.top = targetRect.bottom;
            break;
          case "top":
            this.styleObject.bottom = targetRect.top;
            break;
          case "center":
            this.styleObject.top =
              targetRect.bottom -
              parseInt(targetRect.height / 2) -
              parseInt(popoverSize.height / 2);
            break;
          default:
            // default as bottom
            this.styleObject.top = targetRect.bottom;
        }
        switch (this.position[1]) {
          case "right":
            this.styleObject.left = targetRect.right;
            break;
          case "left":
            this.styleObject.right = targetRect.left;
            break;
          case "center":
            this.styleObject.left =
              targetRect.right -
              parseInt(targetRect.width / 2) -
              parseInt(popoverSize.width / 2);
            break;
          default:
            // default as center
            this.styleObject.left =
              targetRect.right -
              parseInt(targetRect.width / 2) -
              parseInt(popoverSize.width / 2);
        }
        // calculate end
      }
    }
  },
  computed: {
    isShow: function() {
      return this.trigger || false;
    }
  },
  watch: {
    isShow: function() {
      // var targetElm = this.target;
      // if (targetElm) {
      //   var viewportOffset = targetElm.getBoundingClientRect();
      //   var top = viewportOffset.top;
      //   var left = viewportOffset.left;
      //   var right = viewportOffset.right;
      //   var bottom = viewportOffset.bottom;
      //   this.styleObject.left = right + "px";
      //   this.styleObject.top = bottom + "px";
      //   this.styleObject.color = "green";
      // }
      this.$nextTick(() => {
        this.setPosition();
      });
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.popover-title {
  color: red;
}
</style>
