<template>
  <div class="uppercase py-5 font-bold text-3xl text-center">
    <div class="border-b-4 border-teal-500 mx-4 pb-4 relative">
      <button @click="closeActiveBucket"
        class="absolute top-0 right-0  btn btn-danger text-sm text-outline-sm">X</button>
      <button v-if="bucket.checked == false" @click="checkBucket(bucket)"
        class="font-bold uppercase  btn btn-info text-outline-sm text-center"><strong>{{
          bucket.name
        }}</strong>
      </button>

      <button v-else @click="checkBucket(bucket)"
        class="font-bold line-through rotate-180 uppercase  btn btn-check text-outline-sm text-center"><strong>{{
          bucket.name
        }}</strong>
      </button>
      <p class="text-xl">
        {{ bucket.description }}
      </p>

      <button v-if="editable.edit != true" @click="editable.edit = !editable.edit"
        class=" btn btn-warn text-outline-sm text-lg">Edit</button>
      <button v-else @click="editable.edit = !editable.edit"
        class=" btn btn-warn text-outline-sm text-lg">Cancel</button>

      <div v-if="editable.edit == true">
        <BucketEditForm :editProp="bucket" @bucketEdited="editable.edit = false" />
      </div>

    </div>
    <div v-for="item, index in bucketItems" :key="item.bucketItemId">
      <BucketItemCard :itemProp="item" :index="index" />
    </div>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { computed, ref } from "vue";
import BucketEditForm from "./BucketEditForm.vue";
import BucketItemCard from "./BucketItemCard.vue";
import { bucketService } from "@/services/BucketService.js";
import Pop from "@/utils/Pop.js";

export default {
  components: {
    BucketEditForm,
    BucketItemCard
  },

  setup() {
    const editable = ref({})
    editable.value.edit = false
    return {
      editable,
      bucket: computed(() => AppState.activeBucket),
      bucketItems: computed(() => AppState.activeBucketItems),

      async checkBucket(bucket) {
        try {
          const bucketId = bucket.id
          const newBucket = await bucketService.checkBucket(bucketId)
          AppState.activeBucket = newBucket
        } catch (error) {
          Pop.error(error.message, '[Kick error, Something went wrong]')
        }
      },

      closeActiveBucket() {
        AppState.activeBucket = {}
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>