import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import Device from '@/views/Device/Device'
import RealDetail from '@/views/RealDetail/RealDetail'
import AlarmHistory from '@/views/AlarmHistory/AlarmHistory'
import Highchart from '@/views/Highchart/Highchart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/device',
      name: 'device',
      component: Device,
      children: [
        {
          path: '/realDetail',
          name: 'realDetail',
          component: RealDetail,
          children: [
            {
              path: '/alarmHistory/:deviceid',
              name: 'alarmHistory',
              component: AlarmHistory
            },
            {
              path: '/realDetail/:deviceid/:numberid',
              component: Highchart
            }
          ]
        }
      ]
    }
  ]
})
