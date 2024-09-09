import { Item } from "@/models/Item.js"
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { accountService } from "./AccountService.js"

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

  async getItemsByBucketId(bucketId) {
    const config = accountService.createConfig()
    const res = await api.get(`api/buckets/${bucketId}/items`, config)
    const items = res.data.map(i => new Item(i))
    AppState.activeBucketItems = items
    const bucketIndex = AppState.buckets.findIndex((i) => i.id == bucketId)
    AppState.bucketItemsCache[bucketIndex] = items
  }

  async createItem(itemData) {
    const res = await api.post('api/items', itemData)
    const item = new Item(res.data)
    AppState.items.push(item)
    return item
  }

  async editItem(itemData) {
    const res = await api.put(`api/items/${itemData.id}`, itemData)
    const newItem = new Item(res.data)
    const indexToReplace = AppState.items.findIndex((i) => i.id == newItem.id)
    AppState.items[indexToReplace] = newItem;
    logger.log(newItem, indexToReplace, AppState.items)
    AppState.activeItem = newItem
  }


  async deleteItem(itemId) {
    await api.delete(`api/items/${itemId}`, itemId)
    AppState.items = AppState.items.filter(a => a.id != itemId)
  }
}
export const itemsService = new ItemsService()