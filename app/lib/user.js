const map = new WeakMap()

export default class User {
  constructor (id, socket) {
    map.set(this, { id, socket })
  }

  get id () { return map.get(this).id }
  get socket () { return map.get(this).socket }
}
