<template>
  <form v-if="showForm != false" @submit.prevent="createItem" class="mb-4">
    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="editable.name" class="border p-2 w-full bg-black/75 rounded" required />
    </div>
    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="editable.description" class="border p-2 w-full bg-black/75 rounded" />
    </div>
    <div class="mb-2">
      <label class="block">Price</label>
      <input type="number" step=".01" v-model="editable.price" class="border p-2 w-full bg-black/75 rounded" required />
    </div>
    <div class="flex justify-between px-3">
      <button type="submit" class=" btn btn-success text-lg font-bold text-outline-sm">Create</button>
      <button @click="setForm('itemForm')" class=" btn btn-danger text-lg font-bold text-outline-sm">
        Cancel</button>
    </div>
  </form>
</template>


<script>
import { AppState } from "@/AppState.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";

export default {
  setup() {
    const editable = ref({})

    return {
      editable,
      showForm: computed(() => AppState.itemForm),

      setForm(form) {
        AppState[form] = !AppState[form]
      },

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
