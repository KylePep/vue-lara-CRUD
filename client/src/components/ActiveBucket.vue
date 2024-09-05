<template>
  <div class="uppercase font-bold text-5xl text-center">
    {{ bucket.name }}
    {{ bucket.description }}
    <button @click="editable.edit = !editable.edit"
      class="bg-yellow-500 hover:bg-yellow-700 text-black text-sm py-1 px-2 rounded">Edit</button>
    <button @click="closeActiveBucket"
      class="bg-red-500 hover:bg-red-700 text-black text-sm py-1 px-2 rounded">Close</button>
    <div v-if="editable.edit == true">
      <BucketEditForm :editProp="bucket" @bucketEdited="editable.edit = false" />
    </div>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Bucket } from "@/models/Bucket.js";
import { computed, ref } from "vue";
import BucketEditForm from "./BucketEditForm.vue";

export default {
  components: {
    BucketEditForm,
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
      closeActiveBucket() {
        AppState.activeBucket = {}
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>