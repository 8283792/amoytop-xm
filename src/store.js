import Vue from 'vue'
import Vuex from 'vuex'

import * as types from '@/mutation-types'
import { loadUserData, setUserData, clearUser } from '@/common/cache/cache'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: loadUserData(),
    chartPoint: {}
  },
  getters: {
    // 数据点
    chartPoint(state) {
      // console.log('state.chartPoint', state.chartPoint)
      console.log(state.chartPoint)
      return state.chartPoint || ''
    },
    user(state) {
      return state.userData || ''
    }
  },
  mutations: {
    [types.SET_USER_DATA](state, user) {
      state.userData = user
    },
    [types.SET_CHART_POINT](state, chartPoint) {
      // console.log('state.chartPoint', chartPoint)
      state.chartPoint = chartPoint
    }
  },
  actions: {
    saveUserData({commit}, user) {
      commit(types.SET_USER_DATA, setUserData(user))
    },
    clearUserData({commit}) {
      commit(types.SET_USER_DATA, clearUser())
    }
  }
})