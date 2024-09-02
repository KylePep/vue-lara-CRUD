<template>
  <form @submit.prevent="createBucket" class="mb-4">
    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="editable.name" class="border p-2 w-full bg-gray-500" required />
    </div>
    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="editable.description" class="border p-2 w-full bg-gray-500" />
    </div>
    <!-- <div class="mb-2">
      <label class="block">Price</label>
      <input type="number" step=".01" v-model="editable.price" class="border p-2 w-full bg-gray-500" required />
    </div> -->
    <button type="submit" class="bg-green-500 text-white p-2 rounded">Add Bucket</button>
  </form>
</template>


<script>
import { bucketService } from "@/services/BucketService.js";
import Pop from "@/utils/Pop.js";
import { ref } from "vue";

export default {
  setup() {
    const editable = ref({})

    return {
      editable,
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
