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
        //Get bucket Items
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>