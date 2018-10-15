export const DEFAULT_STORE_KEY = "common-ground"

export default class StorageManager {
  constructor (store_key=DEFAULT_STORE_KEY) {
    this.store_key = store_key
    if (localStorage.getItem(this.store_key) === null) this.reset()
  }

  get (key) {
    return this.store[key]
  }

  set (key, value="") {
    localStorage.setItem(this.store_key, JSON.stringify({
      ...this.store,
      [key]: value
    }))

    return value
  }

  has (key) {
    return this.store.hasOwnProperty(key)
  }

  reset () {
    localStorage.setItem(this.store_key, JSON.stringify({}))
  }

  get store () { return JSON.parse(localStorage.getItem(this.store_key)) }
}
