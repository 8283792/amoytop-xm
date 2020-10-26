import { Toast } from 'vant'

const Toast = (type, position = 'bottom', message) => {
  Toast({
    type,
    position,
    message
  })
}

export {
  Toast
}