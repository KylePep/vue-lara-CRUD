<template>
  <form @submit.prevent="editBucket(editData.id)" class="mb-4 text-sm">
    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="editable.name" class="border p-2 w-full bg-black/75 rounded" required />
    </div>

    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="editable.description" class="border p-2 w-full bg-black/75 rounded" />
    </div>

    <button type="submit" class=" btn btn-success text-lg text-outline-sm uppercase">Edit Bucket</button>
  </form>
</template>


<script>
import { Bucket } from "@/models/Bucket.js";
import { bucketService } from "@/services/BucketService.js";
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";

export default {
  emits: (['bucketEdited']),
  props: {
    editProp: { type: Bucket }
  },
  setup(props, ctx) {
    const editable = ref({})
    editable.value.name = props.editProp.name
    editable.value.description = props.editProp.description

    return {
      editData: computed(() => props.editProp),
      editable,
      async editBucket(editId) {
        try {
          const bucketData = editable.value
          bucketData.id = editId
          await bucketService.editBucket(bucketData)
          ctx.emit('bucketEdited');
          editable.value = {}
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
