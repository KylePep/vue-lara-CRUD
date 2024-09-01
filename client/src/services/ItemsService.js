import { Item } from "@/models/Item.js"
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class ItemsService {
  async getItems() {
    const res = await api.get('api/items')
    const items = res.data.map(i => new Item(i))
    AppState.items = items
  }
  async getItemById(itemId) {
    const res = await api.get(`api/items/${itemId}`)
    const item = new Item(res.data)
    AppState.activeItem = item
  }

  async createItem(itemData) {
    const res = await api.post('api/items', itemData)
    const item = new Item(res.data)
    AppState.items.push(item)
    return item
  }
}
export const itemsService = new ItemsService()