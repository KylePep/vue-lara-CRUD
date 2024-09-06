import { api } from "./AxiosService.js";
import { accountService } from "./AccountService.js";
import { Item } from "@/models/Item.js";
import { AppState } from "@/AppState.js";

class BucketItemsService {

  async createBucketItem(bucketItemData) {
    const config = accountService.createConfig()
    const res = await api.post('api/bucketItems', bucketItemData, config)
    const newBucketItem = new Item(res.data)
    AppState.activeBucketItems.push(newBucketItem)
  }

  async removeBucketItem(bucketItemId) {
    await api.delete(`api/bucketItems/${bucketItemId}`)
    const bucketItemIndex = AppState.activeBucketItems.findIndex(bi => bi.bucketItemId == bucketItemId)
    AppState.keeps.splice(bucketItemIndex, 1)
  }
}
export const bucketItemsService = new BucketItemsService()