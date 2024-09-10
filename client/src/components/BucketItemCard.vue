<template>
  <div class="flex flex-col text-l my-3 border-b border-teal-500/75 pb-4 mx-2">
    <div class="relative">
      <div class="flex justify-center">
        <button v-if="item.checked == false" @click="checkBucketItem(item)"
          class="font-bold uppercase btn-info"><strong>{{
            item.name }}</strong>
        </button>
        <button v-else @click="checkBucketItem(item)" class="font-bold line-through uppercase btn-warn"><strong>{{
          item.name
            }}</strong>
        </button>
      </div>
      <div class="absolute top-0 right-0">
        <button @click="removeBucketItem(item)" class="px-1 py-0 btn-danger">-</button>
      </div>
      <div class="absolute top-0 left-0 text-base px-5 font-medium">{{ itemIndex + 1 }}</div>
      <p class="text-xs font-medium">{{ item.description }}</p>
    </div>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Item } from "@/models/Item.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";
import { bucketItemsService } from "@/services/bucketItemsService.js";
import { logger } from "@/utils/Logger.js";

export default {
  props: {
    itemProp: { type: Item },
    index: { type: Number }
  },
  setup(props) {
    return {
      item: computed(() => props.itemProp),
      itemIndex: computed(() => props.index),
      activeBucket: computed(() => AppState.activeBucket.id),

      async checkBucketItem(item) {
        try {
          const bucketItemId = item.bucketItemId
          await bucketItemsService.checkBucketItem(bucketItemId)
        } catch (error) {
          Pop.error(error.message, '[Kick error, Something went wrong]')
        }
      },

      async removeBucketItem(item) {
        try {
          const confirmDelete = await Pop.confirm(`Delete ${item.name}`)
          if (!confirmDelete) {
            return
          }
          const bucketItemData = {}
          bucketItemData.bucketId = AppState.activeBucket.id
          bucketItemData.bucketItemId = item.bucketItemId
          await bucketItemsService.removeBucketItem(bucketItemData)
        } catch (error) {
          logger.log('[ERROR MADE IT HERE]')
          Pop.error(error.message, '[]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>