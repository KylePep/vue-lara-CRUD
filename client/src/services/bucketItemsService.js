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

  async removeBucketItem(bucketItemId) {
    await api.delete(`api/bucketitems/${bucketItemId}`)
    const bucketItemIndex = AppState.activeBucketItems.findIndex(bi => bi.bucketItemId == bucketItemId)
    AppState.keeps.splice(bucketItemIndex, 1)
  }
}
export const bucketItemsService = new BucketItemsService()