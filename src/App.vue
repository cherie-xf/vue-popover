<template>
  <div id="app">
    <h1 class="page-title"> vue popover demo</h1>
    <div class="vu-popover-container">
      <span v-popover="{ title: 'Nice try!', trigger:'contextmenu', theme:'black' }">
        <b>I have popover(right click to see)</b>
        <div data-name="popover-content">
          <span>this is the popover content {{message}}</span>
          <vu-test color="purple"></vu-test>
        </div>
      </span>
    </div>
    <h3>popover with theme</h3>
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
              <span v-popover="{title: 'tooltip title', appendTo: 'table-container', theme: cell}">
                <span v-html="cell + '(hover me)'"></span>
                <div data-name="popover-content">
                  <div>
                    <span>add your content here: </span>
                    <span>{{message}}</span>
                  </div>
                  <div>
                    <span>this is children components: </span>
                    <vu-test color="pink"></vu-test>
                  </div>
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
      message: new Date().toISOString().split('T')[0],
      index: [0, 1, 2, 3, 4, 5],
      //colors:['white','blue','green','yellow','red','black','blue','green','yellow','black']
      colors:['white','blue','green','yellow','red','black']
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
          return this.colors[i];
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
.vu-popover-container{
  display: inline-block;
  margin: 15px;

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
}
.table-container {
  overflow: auto;
}
table {
  width: 100%;
  border: 1px solid #333;
}
tr {
  height: 45px;
}
</style>
