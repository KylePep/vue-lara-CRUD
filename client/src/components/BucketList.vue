<template>
  <div>
    <ul>
      <li v-for="bucket in buckets" :key="bucket.id" class="mb-2 p-4 border-b border-teal-500">
        <BucketCard :bucketProp="bucket" />

      </li>
    </ul>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { computed } from "vue";
import BucketCard from "./bucketCard.vue";

export default {
  components: {
    BucketCard,
  },
  setup() {
    return {
      buckets: computed(() => AppState.buckets),

    }
  }
}
</script>


<style lang="scss" scoped></style>