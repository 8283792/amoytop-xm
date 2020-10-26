<template>
    <transition name="slide-in">
      <div class="detail">
        <van-nav-bar
          :title="title"
          left-arrow
          @click-left="back"
        />

        <div class="wrapper">
          <div class="device-wrapper ios-scroll" v-if="active == 0">
            <div class="padding-top-26">
              <span class="left-title">设备信息</span>
              <div class="device-info">
                <h4 v-if="contralStatus[0] && contralStatus[0][0].length" class="text-left">设备名称： {{ contralStatus[0][0].devicename }}</h4>
                <h4 v-if="contralStatus[0] && contralStatus[0][0].length && contralStatus[0][0].rtvalue != '0'" class="text-left">生产批号：{{ contralStatus[0][0].rtvalue }}</h4>
                <h4 class="text-left cell-flex">
                  <div>控制状态：</div>
                  <span>
                    <div :key="idx" v-for="(item, idx) in contralStatus">
                      <span v-show="status.numberid != 'BatchNo' && item.length" :class="status.rtvalue == 0 ? 'background-gray' : ''" :key="status.numberid" v-for="status in item" class="status-box">{{ status.numberdescribe }}</span>
                    </div>
                  </span>
                </h4>
              </div>
            </div>

            <div class="padding-top-26">
              <span class="left-title">电机状态</span>
              <div v-if="Array.isArray(status[0]) && elcStatus.length" :key="idx" v-for="(status, idx) in elcStatus" class="elec-device-title text-center">
                <span v-if="status[0][0]" :class="status[0][0].rtvalue == 0 ? 'background-gray' : ''" class="status-box font-26">{{ status[0][0].numbername }}</span>
                <div style="display: flex;margin: 18px 0px;">
                  <span :key="val.numberid" v-for="val in status[1]" class="status-box">
                    {{ val.numbername }}
                    <div>{{ val.rtvalue }} {{ val.numbereu }}</div>
                  </span>
                </div>
              </div>

              <div v-if="!Array.isArray(status[0]) && elcStatus.length" :key="idx" v-for="(status, idx) in elcStatus" class="cell-flex">
                <span :key="valve.numberid" v-for="valve in status" class="status-box" :class="valve.rtvalue == 0 ? 'background-gray' : ''">{{ valve.numbername }}</span>
              </div>
            </div>

            <div class="padding-top-26">
              <span class="left-title">关键阀门</span>
              <div v-if="mainValve.length" class="cell-flex">
                <span :class="valve.rtvalue == 0 ? 'background-gray' : ''" :key="valve.numberid" v-for="valve in mainValve" class="status-box">{{ valve.numbername }}</span>
              </div>
            </div>
          </div>

          <div v-else-if="active == 1" class="device-wrapper ios-scroll">
            <div class="padding-top-26">
              <span class="left-title">设备信息</span>
              <div class="device-info">
                <h4 class="text-left">设备名称：<span v-if="publicProject.length">{{ publicProject[0].devicename }}</span></h4>
                <h4 class="text-left">生产批号：{{ productNo.rtvalue }}</h4>

                <h4 class="text-left cell-flex">
                  <span>环境参数：</span>
                  <span v-if="envParams && envParams.length">
                    <div>
                      <span :key="idx" v-for="(item, idx) in envParams" style="min-width: 80px;" class="status-box">
                        {{ item.numberdescribe }}
                        <div>{{ item.rtvalue }} {{ item.numbereu }}</div>
                      </span>
                    </div>
                  </span>
                </h4>

                <h4 class="text-left cell-flex">
                  <span>公共工程：</span>
                  <span v-if="publicProject && publicProject.length">
                    <div>
                      <span :key="idx" v-for="(item, idx) in publicProject" class="status-box">
                        {{ item.numberdescribe }}
                        <div>{{ item.rtvalue }} {{ item.numbereu }}</div>
                      </span>
                    </div>
                  </span>
                </h4>
              </div>
            </div>

            <div class="padding-top-26">
              <span class="left-title">工艺数据</span>
              <div v-if="processData && processData.length">
                <div style="margin: 20px 0px;text-align: center;">
                  <span @click="toChart(process[0])" :key="process[0].numberid" v-for="process in processData" style="width: 38%;margin: 10px 16px;" class="status-box">
                    {{ process[0].numbername }}
                    <div>{{ process[0].rtvalue }} {{ process[0].numbereu }}</div>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="device-wrapper ios-scroll" v-else-if="active == 2">
            <div class="padding-top-26">
              <!-- <span class="left-title">设备信息</span> -->
              <div class="device-info">
                <div :key="msg.numberid" v-for="msg in alarmMsg">
                  <h4 class="text-left clearfix">
                    设备名称：{{ msg.deviceid }}
                    <span @click="toHistory(msg)" class="float-right font-gray">报警历史 > </span>
                  </h4>
                  <div>
                    <div :key="idx" v-for="(item, idx) in msg.alarminfo" class="bg-red msg-cell">
                      <span class="flex-1 text-ellipsis">{{ item.numbername }}</span>
                      <span @click="saveAlarmMsg(item)" class="bg-oranage sure-btn">
                        确认
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="device-wrapper ios-scroll" v-else-if="active == 3">
            <product-table></product-table>
          </div>

        </div>

        <van-tabbar v-model='active' @change="initPage" fixed>
          <van-tabbar-item icon='diannao'>
            实时状态
          </van-tabbar-item>

          <van-tabbar-item icon='chat'>
            实时数据
          </van-tabbar-item>

          <van-tabbar-item icon='lingdang'>
            实时报警
          </van-tabbar-item>

          <van-tabbar-item icon='jilu'>
            冻干记录
          </van-tabbar-item>
        </van-tabbar>
        <router-view></router-view>
    </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { apiConfig } from '@/config/apiConfig'
import { Http } from '@/utils/http'
import { SocketData } from '@/models/socketData'
import { Utils } from '@/utils/utils'
import productTable from '@/views/ProductTable/productTable'

const WS_URL1 = apiConfig.WS_URL1
const WS_URL2 = apiConfig.WS_URL2

let ws = null

export default {
  name: 'detail',
  data() {
    return {
      title: '实时状态',
      active: 0, // tab索引
      WS_URL: WS_URL1,
      contralStatus: [], // 控制状态
      elcStatus: [], // 电机状态
      mainValve: [], // 关键阀门
      publicProject: [], // 公共工程
      envParams: [], // 环境参数
      processData: [], // 工艺数据
      productNo: [], // 生产批号
      alarmMsg: [], // 报警信息
      selectedItem: '' // 选择展示图表的数据点
    }
  },
  components: {
    productTable
  },
  computed: {
    ...mapGetters([
      'user',
      'signString'
    ])
  },
  created() {
    let deviceId = this.$route.query.deviceId
    if (!deviceId || deviceId == 'undefined') {
      this.$toast({
        message: '设备号错误',
        position: 'bottom'
      })
      this.back()
      return
    }
    this.initSocket()
  },
  methods: {
    back() {
      this.$router.back()
    },
    toHistory(item) {
      const { username, userid } = this.user,
            { deviceid } = item,
            params = {
              ui: Utils.jsonToString({ username, userid }),
              deviceid,
              page: 1,
              maxline: 100
            }

      this.$router.push({
        path: `/alarmHistory/${deviceid}`
      })
    },
    // 保存用户确认报警信息
    saveAlarmMsg(item) {
      const {deviceid, numberid, alarmid} = item,
            { username, userid } = this.user,
            params = {
              ui: Utils.jsonToString({ username, userid }),
              deviceid,
              numberid,
              alarmid
            }

      this.$dialog.confirm({
        title: '确认',
        message: '是否确认报警信息'
      }).then(async () => {
        const url = '/savealarmconfirm'
        const data = await Http.request({
          url,
          data: params,
          method: 'POST'
        })

        if (data.status == 1) this.initAlarm()
        this.$toast({
          message: data.message || '服务端错误',
          position: 'bottom'
        })
      }).catch(() => {
        
      })
    },
    initPage(idx) {
      const titles = ['实时状态', '实时数据', '实时报警', '冻干记录']
      if (ws) {
        ws.close()
      }
      if (idx == 0 || idx == 1) {
        if (idx == 0) {
          this.WS_URL = WS_URL1
          this.initSocket()
        } else if (idx == 1 && ws) {
          this.WS_URL = WS_URL2
          this.initSocket()
        }
      } else if (idx == 2) {
        this.initAlarm()
      } else if(idx == 3){

      }
      this.title = titles[idx]
    },
    // 初始化websocket
    initSocket () {
      const username = this.user.username,
            deviceId = this.$route.query.deviceId,
            socketModel = new SocketData(this.WS_URL)

      ws = socketModel.socket
      if (this.selectedItem) this.selectedItem = ''
      const openData = socketModel.open(username, deviceId)
      if(!openData) {
        this.$toast({
          message: '请重新登录',
          position: 'bottom'
        })
        this.$router.push('/login')
      }

      const messageData = socketModel.message(this.message)
    },
    // 接收socket消息
    message(rec){
      const self = this
      const WS_URL = self.WS_URL
      if (WS_URL == WS_URL1) {
        console.log("WS_URL1", rec)
        self.contralStatus = rec[0]
        self.elcStatus = rec[1]
        self.mainValve = rec[2]
      } else if (WS_URL == WS_URL2) {
        console.log("WS_URL2", rec)
        self.productNo = rec[0][0]
        self.envParams = rec[1]
        self.publicProject = rec[2]
        
        self.processData = rec[3]
      }

      let projectData = rec[3] || []

      if (self.selectedItem) {
        const idx = projectData.findIndex((item, idx) => {
          return item[0].numberid == self.selectedItem
        })
        
        projectData[idx][0].value = projectData[idx][0].rtvalue
        let arr = [projectData[idx]]
        self.setPoint(arr)

        console.log("projectData[idx]", projectData[idx])
      }
    },
    // 初始化实时报警
    async initAlarm() {
      const { username, userid } = this.user
      const params = {
        ui: Utils.jsonToString({ username, userid }),
        linecount: 3
      }

      const url = '/getalarmconfirm'
      const data = await Http.request({
        url,
        data: params,
        method: 'POST'
      })
      if (data && data.length) this.alarmMsg = data
    },
    // 跳转输入图表数据点
    async toChart (item) {
      this.selectedItem = item.numberid

      const { username, userid } = this.user
      const params = {
        ui: Utils.jsonToString({ userid }),
        deviceid: item.deviceid,
        numberid: item.numberid
      }

      const url = '/getnumberscope'
      const data = await Http.request({
        url,
        data: params,
        method: 'POST'
      })

      if (data) {
        this.$router.push({
          path: `/realDetail/${item.deviceid}/${item.numberid}`,
          query: {
            numbereu: item.numbereu,
            numberdescribe: item.numberdescribe,
            deviceName: item.devicename,
            min: data.min,
            max: data.max
          }
        })
      }
    },
    ...mapMutations({
      setPoint: 'SET_CHART_POINT',
    })
  },
  beforeDestroy () {
    if (ws) ws.close()
  }
}
</script>

<style lang="css" scoped>
.detail {
  position: fixed;
  top: 0;
  width: 100%;
  bottom: 0;
  background: #fff;
  z-index: 20;
}
.wrapper {
  height: calc(100vh - 94px);
  overflow: auto;
}
.tabs {
  height: calc(100vh - 46px);
  padding-top: 0;
  margin-top: -1px;
}
.lyophilizer {
  width: 60vw;
  margin: 0 auto 8px auto;
}
.detail_alarm {
  width: 2rem;
  vertical-align: text-bottom;
}
.numberBox {
  display: inline-block;
  font-size: .8rem;
  margin: 0 0.16rem;
}
.paramBox {
  width: 28vw;
  height: 1.8rem;
  line-height: 1.8rem;
  background: rgb(235, 235, 235);
  border: 1px solid #000;
  color: rgb(184, 14, 14);
  margin: 8px 0;
  text-align: center;
  font-size: 1.2rem;
}
.fatTable {
  border-collapse: collapse;
  word-break:break-all;
  margin-bottom: 20px;
  width: 100%;
}
.fatTable, td, th {
  border: 1px solid black;
  word-wrap:break-word;
}
.van-icon .van-icon-check{
  font-size: 20px !important;
}
.van-radio {
  display: inline-block;
}
.no-border-textarea {
  padding: 0;
}
.alarmBox {
  color: #06bf04;
}
.title {
  font-size: 0.8rem;
}
.pagination {
  position:absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 10px;
}
.pageIpt {
  width: 34px;
  max-height: 34px;
  text-align: center;
  border: #000 solid 1px;
  border-radius: 8px;
}
.goBtn {
  text-decoration: underline;
  color: #00c000;
  font-size: 20px;
  margin-left: 10px;
}
.device-wrapper {
  box-shadow: 0 0 12px #ccc;
  margin: 16px 10px;
  overflow: hidden;
  padding-bottom: 8px;
  min-height: 95%;
}
.left-title {
  color: #fff;
  background: #4197d5;
  padding: 2px 8px;
  border-radius: 0 0.8em 0.8em 0;
  font-size: 14px;
}
.status-box {
  flex: 1;
  background: #079a0c;
  color: #fff;
  margin: 2px;
  display: inline-block;
  padding: 2px;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
}
.cell-flex {
  display: flex;
  margin: 20px 0;
}
.elec-device-title {
  font-size: 20px;
}
.device-info {
  padding: 0 16px;
}
.msg-cell {
  height: 28px;
  line-height: 28px;
  display: flex;
  padding-left: 6px;
  color: #fff;
  margin: 2px 0;
}
.sure-btn {
  line-height: 8px;
  padding: 10px;
}
.background-gray {
  background:gray;
}
</style>
