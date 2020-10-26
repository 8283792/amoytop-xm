import { Toast } from 'vant'
import Qs from 'qs'

const axiosConfig = {
  headers: {
    'Accept': 'application/json; charset=utf-8'
  },
  // 跨域类型时是否在请求中协带cookie
  withCredentials: false,
  transformRequest: [function (data) {
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,  
    //   loadingType: 'spinner',
    //   duration: 0
    // })
    return Qs.stringify(data)
  }],
  transformResponse: [function (data) {
    Toast.clear()
    return JSON.parse(data)
  }]
}

export {
  axiosConfig
}