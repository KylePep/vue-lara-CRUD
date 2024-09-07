<template>
  <div class="uppercase py-5 font-bold text-3xl text-center">
    <div class="border-b mx-10 pb-4 relative">
      <button @click="closeActiveBucket"
        class="absolute top-0 right-0 text-white hover:text-gray-400 text-sm py-1 px-2 rounded">X</button>
      <p>
        {{ bucket.name }}
      </p>
      <p class="text-xl">
        {{ bucket.description }}
      </p>

      <button v-if="editable.edit != true" @click="editable.edit = !editable.edit"
        class="bg-yellow-500 hover:bg-yellow-700 text-black text-sm py-1 px-2 rounded">Edit</button>
      <button v-else @click="editable.edit = !editable.edit"
        class="bg-yellow-500 hover:bg-yellow-700 text-black text-sm py-1 px-2 rounded">Cancel</button>

      <div v-if="editable.edit == true">
        <BucketEditForm :editProp="bucket" @bucketEdited="editable.edit = false" />
      </div>

    </div>
    <div v-for="item in bucketItems" :key="item.id">
      <BucketItemCard :itemProp="item" />
    </div>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Bucket } from "@/models/Bucket.js";
import { computed, ref } from "vue";
import BucketEditForm from "./BucketEditForm.vue";
import BucketItemCard from "./BucketItemCard.vue";

export default {
  components: {
    BucketEditForm,
    BucketItemCard
  },
  props: {
    bucketProp: { type: Bucket }
  },

  setup(props) {
    const editable = ref({})
    editable.value.edit = false
    return {
      editable,
      bucket: computed(() => props.bucketProp),
      bucketItems: computed(() => AppState.activeBucketItems),
      closeActiveBucket() {
        AppState.activeBucket = {}
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>