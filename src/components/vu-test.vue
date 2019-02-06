<template>
    <button :style="styleObject" @click="onClick">test component</button>
</template>

<script>
export default {
  name: "vu-test",
  props: ["color"],
  computed:{
      styleObject: function(){
          return {
              color: this.color,
          }
      }
  },
  methods:{
      onClick: function(){
          consloe.log(' popover button clicked!')
      }
  }
}
</script>


