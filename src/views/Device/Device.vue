<template>
  <div>
    <div class="container">
      <van-nav-bar itle="选择设备">
        <van-icon @click="logout" class="btn-exit" name="share" slot="right" />
      </van-nav-bar>
      
      <div class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        > 
          <div @click="selectDevice(item)" class="cell" :key="index" v-for="(item, index) in list">
              <div class="radius-panel panel-title">
                <span class="title">{{ item.devicename }}</span>
                <span class="status" :style="{ background: item.statusColor }">{{ item.status }}</span>
              </div>
              <hr class="line" />
              <div class="radius-panel panel-content">
                <p>
                  <span>设备名称：</span>{{ item.devicename }}
                </p>
                <p>
                  <span>设备ID：</span>{{ item.deviceid }}
                </p>
                <p v-if="item.local">
                  <span>所在位置：</span>{{ item.local }}
                </p>
              </div>
          </div>
        </van-list>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'

export default {
  name: 'device',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    this.onLoad()

    // this.vedio()
  },
  methods: {
    // vedio(){
    //   var player = null;
    //   // 创建视频播放控件
    //   function createVideoPlayer() {
    //     if(!player){
    //       player = plus.video.createLivePusher('videoplayer', {
    //         src:'rtmp://116.228.67.70/stream?dev_id=00310101031111111000002000000000&slot=6&stream=1&mode=live&user=guest02&password=9b8a6a4e2b85407eac16ef30c15c9cbb',
    //         bottom:'100px',
    //         left:'0px',
    //         width: '100%',
    //         height: '200px',
    //         position: 'static'
    //       });
    //       plus.webview.currentWebview().append(player);
    //     }
    //   }
    // },
    onLoad() {
      // this.list = mock
      const { username, userid } = this.user
      let params = {
        ui: Utils.jsonToString({ username, userid })
      }
      if (!userid) return
      this.fetchData('/getdevicelist', params)
    },
    selectDevice(item) {
      this.$router.push({
        path: `/realDetail`,
        query: {
          deviceId: `${item.deviceid}`,
          deviceName: `${item.devicename}`
        }
      })
    },
    logout() {
      this.$dialog.confirm({
        title: '警告',
        message: '确定需要退出当前账户？'
      }).then(() => {
        this.clearUserData()
        this.$toast({
          message: '退出成功',
          position: 'bottom'
        })
        this.$router.push('/')
      }).catch(() => {
        // on cancel
      })
    },
    // 获取数据
    async fetchData(url, params) {
      const data = await Http.request({
        url,
        data: params,
        method: 'POST'
      })

      if(data && data.length != 0){
        this.list = data
        this.loading = false
        this.finished = true
        return
      }

      const errorMsg = !data || !data.length ? '数据出错' : '用户登录失败'
      this.$toast({
        message: errorMsg,
        position: 'bottom'
      })
      
      this.$router.push('/')
    },
    ...mapActions([
      'clearUserData'
    ])
  }
};
</script>

<style lang="css" scoped>
p {
  padding: 0;
  margin: 0 0 8px 0;
}
.container {
  height: 100vh;
  overflow: hidden;
}
.list {
  padding: 10px;
  text-align: left;
  height: calc(100vh - 46px);
  overflow-y: scroll;
}
.list .cell {
  height: 150px;
  margin-bottom: 12px;
}
.radius-panel {
  background: #fff;
  border-radius: 10px;
}
.panel-title {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
}
.panel-content {
  padding: 18px;
}
.line {
  margin: 0 auto;
  width: 90%;
  border-top: 1px dashed #7e7979;
}
.status {
  color: #fff;
  padding: 2px 8px;
  font-size: 14px;
  border-radius: 6px;
}
.btn-exit {
  color: #fff;
  font-size: 24px;
}
</style>
