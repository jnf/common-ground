import { v1 as uuid } from "uuid"
import StorageManager from "./storageManager"

const map = new WeakMap()
export default class User {
  constructor () {
    const storageManager = new StorageManager()
    const id = storageManager.has("id")
      ? storageManager.get("id")
      : storageManager.set("id", uuid())

    map.set(this, { id })
  }

  get id () { return map.get(this).id }
}
