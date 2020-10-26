import { Http } from '@/utils/http'

class LoginData {
  static async fetch(params){
    const url = params.ui ? '/useridlogin' : '/mobilelogin'
    return await Http.request({
      url,
      data: params,
      method: 'POST'
    })
  }
}

export {
  LoginData
}