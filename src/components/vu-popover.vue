<template>
  <!-- <transition name="fade"> -->
  <div class="vu-popover" v-if="isShow" :style="styleObject" :class="theme" ref="vupopover">
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
 * 1) isOpen: controll slider show or hide (required)
 * 2) title:  content of popover title (optional)
 * 3) appendTo: append to container className(optional for calculate position)
 * 4) trigger: trigger event name (by now, only support 'hover', 'click', 'focus', default is 'hover')
 * 5) theme: (white, blue, green, red, yellow, black)
 * =================================
 * popover component will handle position automatically, default right bottom ref to target
 *
 */
const MARGIN = 2;
export default {
  name: "vu-popover",
  props: ["title", "target", "isOpen", "appendTo", "trigger", "theme"],
  data: function() {
    return {
      styleObject: {},
      timeoutId: 0,
      position: ["bottom", "right"],
      popoverSize: {}
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
      this.styleObject = {};
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
        this.popoverSize = {};
        this.popoverSize.width = this.$el.offsetWidth || 0;
        this.popoverSize.height = this.$el.offsetHeight || 0;

        // calculation
        if (
          targetRect.bottom + this.popoverSize.height <
          containerRect.bottom
        ) {
          this.position[0] = "bottom";
        } else if (
          targetRect.top - this.popoverSize.height >
          containerRect.top
        ) {
          this.position[0] = "top";
        } else {
          this.position[0] = "center";
        }

        if (targetRect.right + this.popoverSize.width < containerRect.right) {
          this.position[1] = "right";
        } else if (
          targetRect.left - this.popoverSize.width >
          containerRect.left
        ) {
          this.position[1] = "left";
        } else {
          this.position[1] = "center";
        }

        if (this.position[0] === "center" && this.position[1] === "center") {
          this.position[0] = "bottom"; // better have vertical scroller
        }
        switch (this.position[0]) {
          case "bottom":
            this.styleObject.top = targetRect.bottom + MARGIN;
            break;
          case "top":
            this.styleObject.top = targetRect.top - this.popoverSize.height - MARGIN;
            break;
          case "center":
            this.styleObject.top =
              targetRect.bottom -
              parseInt(targetRect.height / 2) -
              parseInt(this.popoverSize.height / 2);
            break;
          default:
            // default as bottom
            this.styleObject.top = targetRect.bottom + MARGIN;
        }
        switch (this.position[1]) {
          case "right":
            this.styleObject.left = targetRect.right + MARGIN;
            break;
          case "left":
            this.styleObject.left = targetRect.left - this.popoverSize.width - MARGIN;
            break;
          case "center":
            this.styleObject.left =
              targetRect.right -
              parseInt(targetRect.width / 2) -
              parseInt(this.popoverSize.width / 2);
            break;
          default:
            // default as center
            this.styleObject.left =
              targetRect.right -
              parseInt(targetRect.width / 2) -
              parseInt(this.popoverSize.width / 2);
        }
        Object.keys(this.styleObject).map(key => {
          this.styleObject[key] = this.styleObject[key] + "px";
          // console.log("popover offset", key, this.styleObject[key]);
        });
        // console.log("postion", this.position[0], this.position[1]);
        // console.log(
        //   "popover size",
        //   "width",
        //   this.popoverSize.width,
        //   "height",
        //   this.popoverSize.height
        // );
        // console.log(
        //   "target offset",
        //   "top",
        //   targetRect.top,
        //   "bottom",
        //   targetRect.bottom,
        //   "left",
        //   targetRect.left,
        //   "right",
        //   targetRect.right
        // );
        // console.log(
        //   "container offset",
        //   "top",
        //   containerRect.top,
        //   "bottom",
        //   containerRect.bottom,
        //   "left",
        //   containerRect.left,
        //   "right",
        //   containerRect.right
        // );
        // calculate end
      }
    }
  },
  updated() {
    // console.log("popover updated");
  },
  computed: {
    isShow: function() {
      return this.isOpen || false;
    }
  },
  watch: {
    isShow(nv) {
      if (nv) {
        this.$nextTick(() => {
          this.setPosition();
        });
      }
    },
    "popoverSize.height"() {
      this.$nextTick(() => {
        this.setPosition();
      });
    },
    "popoverSize.width"() {
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
  position: fixed;
}
.popover-container {
  background: #fff;
  /* box-shadow: 0px 4px 20px 0px rgba(52, 73, 94, 0.2); */
  padding: 8px;
  border-radius: 8px;
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
  font-weight: bold;
  margin-bottom: 10px;
}
.white .popover-container {
  background-color: white;
  border: 1px solid #dddddd;
  color: #555555;
}

.yellow .popover-container {
  background-color: #f9f2ba;
  border: 1px solid #e9d315;
  color: #5b5316;
}

.blue .popover-container {
  background-color: #d9f1fb;
  border: 1px solid #7fcdee;
  color: #1b475a;
}

.green .popover-container {
  background-color: #f2fdf1;
  border: 1px solid #b6e184;
  color: #558221;
}

.red .popover-container {
  background-color: #bb3b1d;
  border: 1px solid #8f2a0f;
  color: #fcfcfc;
  text-shadow: none;
}

.black .popover-container {
  background-color: #333;
  border: 1px solid #111;
  color: #fcfcfc;
  text-shadow: none;
}
</style>
