<template>
  <div class="flex justify-center">
    <button v-if="bucket.checked == false" @click="setOrCheckBucket(bucket)"
      class="font-bold uppercase  btn btn-info text-outline-sm text-center"><strong>{{
        bucket.name
      }}</strong>
    </button>

    <button v-else @click="setOrCheckBucket(bucket)"
      class="font-bold line-through rotate-180 uppercase  btn btn-check text-outline-sm text-center"><strong>{{
        bucket.name
      }}</strong>
    </button>
  </div>
  <p class="text-center">{{ bucket.description }}</p>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Bucket } from "@/models/Bucket.js";
import { bucketService } from "@/services/BucketService.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";

export default {
  props: {
    bucketProp: { type: Bucket }
  },
  setup(props) {
    return {
      bucket: computed(() => props.bucketProp),

      async setOrCheckBucket(bucket) {
        if (AppState.activeBucket.id != bucket.id) {
          AppState.activeBucketItems = [];
          AppState.activeBucket = bucket;
          const bucketIndex = AppState.buckets.findIndex((i) => i.id == bucket.id)
          if (!AppState.bucketItemsCache[bucketIndex]) {
            this.getItemsByBucketId(bucket.id)
          } else {
            AppState.activeBucketItems = AppState.bucketItemsCache[bucketIndex]
          }
        } else {
          try {
            const bucketId = bucket.id
            await bucketService.checkBucket(bucketId)
          } catch (error) {
            Pop.error(error.message, '[Kick error, Something went wrong]')
          }
        }
      },
      async getItemsByBucketId(bucketId) {
        try {
          await itemsService.getItemsByBucketId(bucketId)
        } catch (error) {
          Pop.error(error.message, '[Something went wrong]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>