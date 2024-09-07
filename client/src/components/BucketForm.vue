<template>
  <button v-if="show == false" @click="show = !show" class="btn-success text-lg font-bold text-outline-sm">New
    Bucket</button>
  <form v-else @submit.prevent="createBucket" class="mb-4">

    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="editable.name" class="border p-2 w-full bg-black/75 rounded" required />
    </div>
    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="editable.description" class="border p-2 w-full bg-black/75 rounded" />
    </div>

    <div class="flex justify-between">
      <button type="submit" class="btn-success text-lg font-bold text-outline-sm">Create</button>
      <button @click="show = !show" class="btn-danger text-lg font-bold text-outline-sm">
        Cancel</button>
    </div>
  </form>
</template>


<script>
import { bucketService } from "@/services/BucketService.js";
import Pop from "@/utils/Pop.js";
import { ref } from "vue";

export default {
  setup() {
    const editable = ref({})
    const show = ref(false)

    return {
      editable,
      show,
      async createBucket() {
        try {
          const bucketData = editable.value
          await bucketService.createBucket(bucketData)
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
