import storage from 'good-storage'

const USER_DATA = 'userData'

function setStorage(key, value) {
  storage.set(key, value)
  return value
}

export function setUserData(data) {
  return setStorage(USER_DATA, data)
}

export function loadUserData() {
  return storage.get(USER_DATA, {})
}

export function clearUser() {
  storage.remove(USER_DATA)
  return []
}