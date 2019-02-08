<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="vu-popover-container">
      <span v-popover="{ title: 'Happy Chinese New Year!', trigger:'click' }">
        <button>I have popover(click to see)</button>
        <div data-name="popover-content">
          <span>this is the popover content {{message}}</span>
          <vu-test color="purple"></vu-test>
        </div>
      </span>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="(title, idx) in titles" v-html="title" :key="idx"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, id) in data" :key="id">
            <td v-for="(cell, i) in row" :key="i">
              <span v-popover="{title: 'table cell tooltip', appendTo: 'table-container'}">
                <span v-html="cell"></span>
                <div data-name="popover-content">
                  <span>this is the popover content</span>
                  <div>{{message}}</div>
                  <vu-test color="purple"></vu-test>
                </div>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
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
      message: new Date(),
      index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  computed: {
    titles() {
      let titles = this.index.map(idx => {
        return "title" + idx;
      });
      titles.unshift("number");
      return titles;
    },
    data() {
      return this.index.map(idx => {
        let row = this.index.map(i => {
          return "cell" + i;
        });
        row.unshift(idx);
        return row;
      });
    }
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
  text-decoration-line: underline;
  text-decoration-style: dashed;
  text-decoration-color: #2c3e50;
  /* border-bottom: 1px dashed black; */
}
.table-container {
  height: 150px;
  overflow: auto;
}
table {
  width: 100%;
  border: 1px solid #333;
}
tr {
  height: 25px;
}
</style>
