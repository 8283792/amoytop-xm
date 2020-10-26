<template>
  <transition name="slide-out">
    <div class="login" v-if="show">
      <img class="logo" src="../../assets/images/loginLogo.png" alt="">

      <van-cell-group class="login-group">
        <van-field
          v-model="username"
          placeholder="请输入用户名"
          left-icon="icon_account"
          clearable
          class="user-input"
          @focus="clearToast"
        />
        <van-field
          v-model="password"
          placeholder="请输入密码"
          left-icon="mima"
          clearable
          class="user-input"
          type="password"
          @focus="clearToast"
        />
      </van-cell-group>

      <van-button @click="login" class="login-btn" size="large">登&nbsp;&nbsp;录</van-button>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LoginData } from '@/models/loginData'
import { Utils } from '@/utils/utils'

export default {
  name: 'login',
  data () {
    return {
      show: true,
      username: '',
      password: ''
    }
  },
  created () {
    const user = this.user
    const { username, userid } = user
    if (user.userid) {
      const params = {
        ui: Utils.jsonToString({username, userid})
      }
      this.doLogin(params)
    }
  },
  mounted(){
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    // 登陆
    login() {
      const { username, password } = this
      if (!username || !password) {
        this.toast('请输入用户名或密码')
        return
      }

      const params = {
        username,
        password
      }
      this.doLogin(params)
    },
    // 登陆交互
    async doLogin (params) {
      const data = await LoginData.fetch(params)

      if (data.status == 1) {
        if (!params.ui) {
          this.saveUserData({
            username: this.username,
            userid: data.message
          })
        }
        this.show = false
        this.$router.push('/device')
      } else if(data.status == 0) {
        this.toast(data.message)
      } else {
        this.toast('服务器响应错误')
      }
    },
    clearToast () {
      this.$toast.clear()
    },
    toast(msg){
      this.$toast({
        message: msg,
        position: 'bottom'
      })
    },
    ...mapActions([
      'saveUserData',
      'clearUserData'
    ])
  },
}
</script>

<style lang="css" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10; */
  /* background: url('../../assets/images/loginBg.jpg'); */
  background-color: #fff;
  background-size: contain;
  text-align: center;
}
.logo {
  /* width: 6rem; */
  height: 30%;
  margin: 16% 0;
}
.login-group {
  padding: 0 28px;
  background: rgba(225,225,225,0);
}
.login-btn {
  /* position: absolute; */
  width: 90%;
  margin-top: 2.6rem;
  left: 5%;
  /* color: #fff; */
  font-size: 20px;
  border-radius: 10px;
  /* background: #18932b; */
}
</style>
