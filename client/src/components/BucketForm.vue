<template>
  <button v-if="show == false" @click="show = !show"
    class="bg-green-500 hover:bg-green-700 px-2 py-1 rounded text-white">New
    Bucket</button>
  <form v-else @submit.prevent="createBucket" class="mb-4">

    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="editable.name" class="border p-2 w-full bg-gray-500" required />
    </div>
    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="editable.description" class="border p-2 w-full bg-gray-500" />
    </div>

    <button type="submit" class="bg-green-500 hover:bg-green-700 text-white p-2 rounded">Create Bucket</button>
    <button @click="show = !show" class="bg-red-500 hover:bg-red-700 p-2 rounded text-white">
      Cancel</button>
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
