<template>
  <div>
    <button @click="setActiveBucket(bucket)"
      class="font-bold uppercase bg-blue-500 hover:bg-blue-700 rounded px-2 py-1 text-center w-full"><strong>{{
        bucket.name
      }}</strong>
    </button>
    <p>{{ bucket.description }}</p>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Item } from "@/models/Item.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";

export default {
  props: {
    bucketProp: { type: Item }
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