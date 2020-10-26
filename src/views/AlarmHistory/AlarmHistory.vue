<template>
    <transition name="slide-in">
      <div class="detail">
        <van-nav-bar
          title="历史报警"
          left-arrow
          @click-left="back"
        />

        <div class="wrapper ios-scroll">
            <div :key="idx" v-for="(history, idx) in historyData" class="mes-cell">
              <img src="../../assets/images/bj.png" alt="">
              <div class="text-wrapper">
                <span>{{ history.date + ' ' + history.time }}</span>
                <h4 style="margin: 0;" class="text-left display-flex">
                  <span class="flex-1">{{ history.devicename }}</span>
                  <span :class="fontColor[history.alarmconfirm]">{{ history.alarmdescribe }}</span>
                </h4>
                <p class="text-ellipsis msg-content">{{ history.numberdescribe }}</p>
              </div>
            </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Http } from '@/utils/http'

export default {
  name: 'detail',
  data() {
    return {
      historyData: 0, // tab索引
      fontColor: ['font-gray', 'font-red', 'font-green'], //0 未确认 1 已确认 2 已修复
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  async mounted() {
    let deviceId = this.$route.params.deviceid
    let params = {
      ui: JSON.stringify({
        username: this.user.username,
        userid: this.user.userid
      }),
      deviceid: deviceId,
      page: 1,
      maxline: 100
    }

    const url = '/getalarmhistory'
    const data = await Http.request({
      url,
      data: params,
      method: 'POST'
    })
    if(data && data.length > 0) this.historyData = data
  },
  methods: {
    back() {
      this.$router.back()
    }
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
  height: calc(100vh - 46px);
  overflow: auto;
}
.mes-cell {
  padding: 16px;
  display: flex;
  border-bottom: 8px #eee solid;
  min-height: 6.2rem;
}
.text-wrapper {
  width: 100%;
  margin-left: 20px;
}
.mes-cell img {
  height: 72px;
}
.msg-content {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>
