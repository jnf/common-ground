const map = new WeakMap()

export default class User {
  constructor (id) {
    map.set(this, { id })
  }

  get id () { return map.get(this).id }
}
