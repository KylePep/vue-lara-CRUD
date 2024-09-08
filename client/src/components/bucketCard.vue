<template>
  <div class="flex justify-center">
    <button v-if="checked == false" @click="setOrCheckBucket(bucket)"
      class="font-bold uppercase btn-info text-outline-sm text-center"><strong>{{
        bucket.name
      }}</strong>
    </button>

    <button v-else @click="setOrCheckBucket(bucket)"
      class="font-bold line-through rotate-180 uppercase btn-warn text-outline-sm text-center"><strong>{{
        bucket.name
      }}</strong>
    </button>
    <!-- <button v-if="checked == false" @click="checked = !checked"
      class="btn-warn font-bold text-outline-sm">Kick!</button>
    <button v-else @click="checked = !checked" class="btn-warn font-bold text-outline-sm">Undo</button> -->
  </div>
  <p class="text-center">{{ bucket.description }}</p>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Bucket } from "@/models/Bucket.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";

export default {
  props: {
    bucketProp: { type: Bucket }
  },
  setup(props) {
    const checked = ref(false)
    return {
      checked,
      bucket: computed(() => props.bucketProp),

      setOrCheckBucket(bucket) {
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
          checked.value = !checked.value
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