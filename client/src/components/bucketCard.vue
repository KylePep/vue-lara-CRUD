<template>
  <div>
    <button @click="setActiveBucket(bucket)"
      class="font-bold uppercase btn-info text-outline-sm text-center w-full"><strong>{{
        bucket.name
      }}</strong>
    </button>
    <p>{{ bucket.description }}</p>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Bucket } from "@/models/Bucket.js";
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

      setActiveBucket(bucket) {
        AppState.activeBucketItems = [];
        AppState.activeBucket = bucket;
        const bucketIndex = AppState.buckets.findIndex((i) => i.id == bucket.id)
        if (!AppState.bucketItemsCache[bucketIndex]) {
          this.getItemsByBucketId(bucket.id)
        } else {
          AppState.activeBucketItems = AppState.bucketItemsCache[bucketIndex]
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