<template>
  <form @submit.prevent="editItem(editData.id)" class="mb-4">
    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="editable.name" class="border p-2 bg-gray-500" required />
    </div>
    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="editable.description" class="border p-2 bg-gray-500" />
    </div>
    <div class="mb-2">
      <label class="block">Price</label>
      <input type="number" v-model="editable.price" class="border p-2 bg-gray-500" required />
    </div>
    <button type="submit" class="bg-green-500 text-white p-2 rounded">Submit Change</button>
  </form>
</template>


<script>
import { Item } from "@/models/Item.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";

export default {

  emits: (['itemEdited']),
  props: {
    editProp: { type: Item }
  },
  setup(props, ctx) {
    const editable = ref({})
    editable.value.name = props.editProp.name
    editable.value.description = props.editProp.description
    editable.value.price = props.editProp.price

    return {
      editData: computed(() => props.editProp),
      editable,
      async editItem(editId) {
        try {
          const itemData = editable.value
          itemData.id = editId
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