<template>
  <div class="flex flex-col">
    <div v-if="editable.edit == false || activeItem != item">
      <div class="flex justify-between">
        <p class="font-bold uppercase"><strong>{{ item.name }}</strong>
        </p>
        <div>
          <button @click="addBucketItem(item)" v-if="activeBucket"
            class="bg-green-500 hover:bg-green-700 py-0 px-1 rounded text-white">+</button>
        </div>
      </div>
      <p>{{ item.description }}</p>
      <p>${{ item.price }}</p>
    </div>
    <div v-else>
      <ItemEditForm :editProp="item" @itemEdited="editable.edit = false" />
    </div>

    <!-- <button v-if="activeItem != item" @click="setActiveItem(item)"
      class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
      OPTION
    </button> -->
    <!-- <div v-else>
      <button @click="editable.edit = !editable.edit"
        class="text-black bg-yellow-500 hover:bg-yellow-700 py-1 px-2 rounded">EDIT</button>
      <button @click="deleteItem(item)" class="bg-red-500 hover:bg-red-700 py-1 px-2 rounded">DELETE</button>
      <button @click="setActiveItem()" class="bg-gray-500 hover:bg-gray-700 py-1 px-2 rounded">X</button>
    </div> -->
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Item } from "@/models/Item.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";
import ItemEditForm from "./ItemEditForm.vue";
import { bucketItemsService } from "@/services/bucketItemsService.js";

export default {
  components: {
    ItemEditForm,
  },
  props: {
    itemProp: { type: Item }
  },
  setup(props) {
    const editable = ref({})
    editable.value.edit = false
    return {
      item: computed(() => props.itemProp),
      editable,
      activeItem: computed(() => AppState.activeItem),
      activeBucket: computed(() => AppState.activeBucket.id),

      setActiveItem(item) {
        if (item == undefined) {
          editable.value.edit = false
        }
        AppState.activeItem = item;
      },

      async addBucketItem(item) {
        try {
          const bucketItemData = {}
          bucketItemData.bucketId = AppState.activeBucket.id
          bucketItemData.itemId = item.id
          await bucketItemsService.createBucketItem(bucketItemData)
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      },

      async deleteItem(item) {
        try {
          const confirmDelete = await Pop.confirm(`Delete ${item.name}`)
          if (!confirmDelete) {
            return
          }
          const itemId = item.id
          await itemsService.deleteItem(itemId)
        } catch (error) {
          Pop.error(error.message, '[Failed to delete Item]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>