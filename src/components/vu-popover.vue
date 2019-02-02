<template>
  <div class="vu-popover" v-if="isShow">
    <div class="popover-container">{{content}}</div>
  </div>
</template>

<script>
export default {
  name: "vu-popover",
  props: ["content", "trigger"],
  // data:function(){
  //   return {
  //     showPopover: false,
  //   }
  // },
  computed: {
    isShow: function(){
      console.log('tigger changed', this.trigger)
      return this.trigger;
    }
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vu-popover {
  position: absolute;
  right: 0;
  bottom: 0;

}
.popover-container {
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(52, 73, 94, 0.2);
  padding: 5px;
  border-radius: 5px;
  z-index: 998;
}
</style>
