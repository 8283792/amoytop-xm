<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './views/Login/Login'

export default {
  data: () => {
    return {
    }
  },
  mounted () {
    this.addEventTest()
  },
  methods: {
    // 监听“返回”按钮事件
    addEventTest() {
      let self = this
      mui.plusReady(function() {
        plus.key.addEventListener('keydown', function (key) {
          console.log('keydown', key)
          if (key.keyCode == 4 && JSON.stringify(self.$route.params) != '{}') {
            self.$router.back()
          } else {
            plus.runtime.quit()
          }
        }, false)
      })
    }
  },
  components: {
    Login
  }
}
</script>

<style lang="css">
body {
  background-color: #f8f8f8;
}
h1, h2, h3, h4, h5, h6 {
  text-align: center;
}
.display-flex {
  display: flex;
  text-align: center;
}
.flex-1 {
  flex: 1;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.float-right {
  float: right;
}
.margin-top-40 {
  margin-top: 40px;
}
.container {
  background: #eee;
  height: calc(100vh - 50px);
}
.bg-oranage {
  background: orange;
}
.bg-red {
  background: #4197d5;
}
.padding-top-26 {
  padding-top: 26px;
}
.text-ellipsis {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.user-input, .van-field__control {
  background-color: rgba(225,225,225,.1) !important;
  font-size: 18px !important;
}
.van-field__control {
  padding-bottom: 6px;
  border-bottom: 1px solid #ccc;
}
.van-icon-icon_account, .van-icon-mima{
  margin-top: -2px;
  margin-right: 14px;
  color: #939090;
}
/* .van-nav-bar {
  background-color: rgb(254, 0, 0) !important;
  color: #fff;
} */
.van-nav-bar .van-nav-bar__title {
  color: #FFFFFF;
}
.van-nav-bar__left>i {
  font-size: 18px !important;
  color: #fff !important;
}
.van-tabs__wrap {
  background: rgb(254, 0, 0);
  padding: 10px 0;
}
.van-tab {
  color: #fff !important;
  background-color: rgb(254, 0, 0) !important;
}
/* .van-tab--active, .van-tabbar-item--active {
  color: rgb(254, 0, 0) !important;
  background-color: #fff !important;
} */
.van-tabs__nav--card {
  border-radius: 10px !important;
  border: 1px solid #fff !important;
  overflow: hidden;
}
.van-tabs__nav--card .van-tab {
  border-right: 1px solid #fff !important;
}
.van-toast {
  border-radius: 20px !important;
}
.van-tabs__content {
  height: calc(100vh - 96px);
  padding-top: 50px;
}
.van-tab__pane {
  height: 100%;
}
/** 右滑删除 */
.van-cell-swipe__right {
  color: #FFFFFF;
  font-size: 15px;
  width: 65px;
  display: inline-block;
  text-align: center;
  background-color: #F44;
  display: flex;
  justify-content: center;
  align-items: center;
}

/** 菜单进入离开动画 */
.slide-out-enter-active, .slide-out-leave-active {
  transition: all .3s ease;
}
.slide-out-leave-to {
  transform: translateX(-100%);
}

.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.3s
}
.slide-in-enter, .slide-in-leave-to {
  transform: translate3d(100%, 0, 0)
}
.no-border-textarea textarea {
  border-bottom: none;
  font-size: 1rem !important;
  height: 10vh;
  padding: 2px 4px;
}
</style>
