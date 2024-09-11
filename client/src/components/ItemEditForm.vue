<template>
  <form @submit.prevent="editActiveItem()" class="mb-4">
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
    <button type="submit" class=" btn btn-success text-3xl uppercase font-bold text-outline-sm">Update</button>
  </form>
</template>


<script>
import { AppState } from "@/AppState.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { ref, watchEffect } from "vue";

export default {

  emits: ['itemEdited'],
  setup(props, ctx) {
    const editable = ref({})
    editable.value.name = AppState.activeItem.name
    editable.value.description = AppState.activeItem.description
    editable.value.price = AppState.activeItem.price

    watchEffect(() => {
      AppState.activeItem.id
      editable.value.name = AppState.activeItem.name
      editable.value.description = AppState.activeItem.description
      editable.value.price = AppState.activeItem.price
    })

    return {
      editable,



      async editActiveItem() {
        try {
          const itemData = editable.value
          itemData.id = AppState.activeItem.id
          await itemsService.editItem(itemData)
          ctx.emit('itemEdited');
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