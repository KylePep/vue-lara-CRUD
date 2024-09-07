import { api } from "./AxiosService.js";
import { accountService } from "./AccountService.js";
import { AppState } from "@/AppState.js";
import { logger } from "@/utils/Logger.js";

class BucketItemsService {

  async createBucketItem(bucketItemData) {
    const config = accountService.createConfig()
    const res = await api.post('api/bucketitems', bucketItemData, config)
    logger.log(res.data)
    const bucketItem = AppState.items.find(i => i.id == res.data.item_id)
    AppState.activeBucketItems.push(bucketItem)
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