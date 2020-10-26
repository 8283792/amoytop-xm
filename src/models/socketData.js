import { Toast } from 'vant'
class SocketData {
  socket
  constructor(socketUrl){
    if ('WebSocket' in window){
      this.socket = new WebSocket(socketUrl)
    }
  }

  open(username, deviceId){
    if(!username || !deviceId) return
    let _off = true
    const _socket = this.socket
    this.Toast = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    _socket.onopen = () => {
      Toast.clear()
      if (username && deviceId) {
        _socket.send(`${username}@${deviceId}`)
      } else {
        _socket.close()
        _off = false
      }
    }
    return _off
  }

  message(callback){
    if(typeof callback != 'function') return
    const _socket = this.socket
    _socket.onmessage = rec => {
      if(this.Toast){
        Toast.clear()
        this.Toast = null
      }
      const data = JSON.parse(rec.data)
      callback && callback(data)
    }
  }

  close(callback){
    if(typeof callback != 'function') return
    const _socket = this.socket
    _socket.onclose = () => {
      callback && callback()
    }
  }

}

export {
  SocketData
}