import { v1 as uuid } from "uuid"
import StorageManager from "./storageManager"

const map = new WeakMap()
const state = {}

export default class User {
  constructor () {
    const storageManager = new StorageManager()
    const id = storageManager.has("id")
      ? storageManager.get("id")
      : storageManager.set("id", uuid())

    map.set(state, { id })
  }

  get id () { return map.get(state).id }
}
