import { api } from "./AxiosService.js";
import { accountService } from "./AccountService.js";
import { AppState } from "@/AppState.js";
import { logger } from "@/utils/Logger.js";
import { Item } from "@/models/Item.js";

class BucketItemsService {

  async createBucketItem(bucketItemData) {
    const config = accountService.createConfig()
    const res = await api.post('api/bucketitems', bucketItemData, config)
    logger.log(res.data)
    const bucketItem = new Item(res.data)
    AppState.activeBucketItems.push(bucketItem)
  }

  async checkBucketItem(bucketItemId) {
    const config = accountService.createConfig()
    const bucketId = AppState.activeBucket.id
    const res = await api.put(`api/bucketitems/${bucketItemId}/check`, {}, config)
    const newBucketItem = new Item(res.data)
    const indexToReplace = AppState.activeBucketItems.findIndex((i) => i.id == newBucketItem.id)
    const bucketIndex = AppState.buckets.findIndex((i) => i.id == bucketId)
    AppState.activeBucketItems[indexToReplace] = newBucketItem;
    AppState.bucketItemsCache[bucketIndex][indexToReplace] = newBucketItem;
  }

  async removeBucketItem(bucketItemData) {

    const config = accountService.createConfig()
    await api.delete(`api/bucketitems/${bucketItemData.bucketItemId}`, config)

    const bucketItemIndex = AppState.activeBucketItems.findIndex(bi => bi.bucketItemId == bucketItemData.bucketItemId)
    AppState.activeBucketItems.splice(bucketItemIndex, 1)

    const bucketIndex = AppState.buckets.findIndex((i) => i.id == bucketItemData.bucketId)

    AppState.bucketItemsCache[bucketIndex] = AppState.activeBucketItems
  }
}
export const bucketItemsService = new BucketItemsService()