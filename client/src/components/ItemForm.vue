<template>
  <form @submit.prevent="createItem" class="mb-4">
    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="editable.name" class="border p-2 w-full" required />
    </div>
    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="editable.description" class="border p-2 w-full" />
    </div>
    <div class="mb-2">
      <label class="block">Price</label>
      <input type="number" v-model="editable.price" class="border p-2 w-full" required />
    </div>
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Item</button>
  </form>
</template>


<script>
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { ref } from "vue";

export default {
  setup() {
    const editable = ref({})

    return {
      editable,
      async createItem() {
        try {
          const itemData = editable.value
          await itemsService.createItem(itemData)
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
