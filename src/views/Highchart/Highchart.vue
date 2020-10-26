<template>
  <transition name="slide-in">
    <div class="highchart">
        <van-nav-bar
          :title="params.numberdescribe"
          left-arrow
          @click-left="back"
        />

        <div class="wrapper">
          <div class="top-wrapper">
            <table>
              <tr>
                <td>编号</td>
                <td>{{params.deviceName}}</td>
              </tr>
              <tr>
                <td>项目</td>
                <td>{{params.numberdescribe}}</td>
              </tr>
              <tr>
                <td>数值</td>
                <td>{{value + ' ' + params.numbereu}}</td>
              </tr>
            </table>
            <Speed :query="params" :data="speedPointData" :config="config" />
          </div>
          <Constant :query="params" :data="constantPointData" :history="historyData" />
        </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'
import Highcharts from 'highcharts/highstock'
import Speed from '@/components/charts/speed'
import Constant from '@/components/charts/constant'

export default {
  name: 'highchart',
  data() {
    return {
      speed: {},
      value: 0,
      deviceName: '',
      speedPointData: 0,
      constantPointData: [],
      historyData: {}
    }
  },
  computed: {
    params: function(){
      return this.$route.query
    },
    ...mapGetters([
      'user',
      'chartPoint'
    ])
  },
  components: {
    Speed,
    Constant
  },
  created () {
    // 必须单独设置 是否使用UTC时间
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    })

    const { min, max } = this.$route.query
// debugger
    this.config = {
      min: Number(min) || 200,
      max: Number(max) || -900
    }
  },
  mounted: function() {
    if (this.$route.params.numberid) {
      let {deviceid, numberid} = this.$route.params
      this.getHistoryChart(deviceid, numberid)
    } else {
      this.back()
      this.$toast({
        message: '数据点为空，无法查看',
        position: 'bottom'
      })
      return
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 获取历史图表数据
    async getHistoryChart(deviceid, numberid) {
      const { username, userid } = this.user,
            url = '/getdatahistory',
            params = {
              ui: Utils.jsonToString({ username, userid }),
              deviceid,
              numberid 
            }

      const data = await Http.request({
        url,
        data: params,
        method: 'POST'
      })

      if(data && data.length) this.historyData = data
    }
  },
  watch: {
    chartPoint: {
      handler(newVal, oldVal) {
        if (newVal) {
          // const val = newVal.rtvalue,
          //       t = new Date(Number(newVal.datetime)).getTime(),
          //       y0 = [t, Number(val)]

          this.value = newVal[0][0].rtvalue
          this.constantPointData = newVal
          this.speedPointData = newVal
        }
      },
      deep: true
    }
  },
  beforeDestroy () {
    if (window.t) {
      clearTimeout(window.t)
    }
  }
}
</script>

<style lang="css" scoped>
.wrapper {
  overflow: auto;
  height: calc(100vh - 46px);
}
.highchart {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: #fff;
}
.top-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 200px;
  padding: 0 10px;
}
.top-wrapper>table {
  background: #fff;
  color: #fff;
  text-align: center;
  border: 1px solid #000;
  height: 80%;
}
.top-wrapper>table td {
  background: rgb(7, 154, 12);
  font-size: 14px;
}
</style>