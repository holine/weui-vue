<template>
  <div id="app">
    <weui-radio v-model="radio" />
    <weui-icon icon="arrow" :size="24" />
    <weui-vtabs :vtabs="vtabs" style="height:100vh" :active-tab.sync="activeTab" tab-line-color="var(--weui-RED)"
    tab-active-text-color="var(--weui-WHITE)" tab-background-color="var(--weui-RED)" @tabclick="tabClick" @change="change">
      <weui-vtabs-content v-for="(item, index) in vtabs" :key="index" :tab-index="index">
        <div style="height: 100vh;">{{ item.content }}</div>
      </weui-vtabs-content>
    </weui-vtabs>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      radio: '1',
      vtabs: [
        {
          title: '全部',
          content: '全部',
        },
        {
          title: '已报名',
          content: '已报名',
        },
        {
          title: '未报名',
          content: '未报名',
        },
      ],
      activeTab: 0,
    }
  },
  methods: {
    tabClick(event) {
      console.log(event)
    },

    change(event) {
      console.log(event)
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<style scoped>
.tab-class /deep/ .weui-tabs-bar__content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 2;
}
</style>
