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
    const bucketItem = AppState.items.find(i => i.id == res.data.item_id)
    AppState.activeBucketItems.push(bucketItem)
  }

  async checkItem(itemData) {
    const config = accountService.createConfig()
    const res = await api.put(`api/bucketitems/${itemData.id}/check`, {}, config)
    const newBucketItem = new Item(res.data)
    const indexToReplace = AppState.activeBucketItems.findIndex((i) => i.id == newBucketItem.id)
    AppState.activeBucketItems[indexToReplace] = newBucketItem;
    AppState.bucketItemsCache[indexToReplace] = newBucketItem;
  }

  async removeBucketItem(bucketItemData) {
    const config = accountService.createConfig()
    await api.delete(`api/bucketitems/${bucketItemData.bucketItemId}`, config)
    const bucketItemIndex = AppState.activeBucketItems.findIndex(bi => bi.bucketItemId == bucketItemData.bucketItemId)
    AppState.activeBucketItems.splice(bucketItemIndex, 1)

    const bucketItemCacheIndex = AppState.bucketItemsCache.findIndex(bi => bi.bucketItemId == bucketItemData.bucketItemId)
    AppState.bucketItemsCache.splice(bucketItemCacheIndex, 1)
  }
}
export const bucketItemsService = new BucketItemsService()