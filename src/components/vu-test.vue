<template>
  <div :style="styleObject">
    <button @click="onClick()">click me!</button>
    <p>{{count}}</p>
  </div>
</template>

<script>
export default {
  name: "vu-test",
  props: ["color"],
  data: () => {
    return {
      count: 0
    };
  },
  computed: {
    styleObject: function() {
      return {
        color: this.color
      };
    }
  },
  methods: {
    onClick: function() {
      this.count += 1;
    }
  }
};
</script>


