import { Item } from "@/models/Item.js"
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class ItemsService {
  async getItems() {
    const res = await api.get('api/keeps')
    const items = res.data.map(i => new Item(i))
    AppState.items = items
  }
  async getVaultById(itemId) {
    const res = await api.get(`api/items/${itemId}`)
    const item = new Item(res.data)
    AppState.activeItem = item
  }
}
export const itemService = new ItemsService()