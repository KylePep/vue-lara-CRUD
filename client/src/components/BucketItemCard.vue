<template>
  <div class="flex flex-col text-l">
    <div class="relative" v-if="editable.edit == false || activeItem != item">
      <div class="flex justify-center">
        <p class="font-bold uppercase"><strong>{{ item.name }}</strong>
        </p>
      </div>
      <div class="absolute top-0 right-0">
        <button @click="removeBucketItem(item)" v-if="activeBucket"
          class=" m-2 px-1 py-0 rounded text-grey-500 hover:text-teal-500 hover:bg-teal-700">-</button>
      </div>
      <p class="text-sm">{{ item.description }}</p>
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

      async removeBucketItem(item) {
        try {
          const bucketItemData = {}
          bucketItemData.bucketId = AppState.activeBucket.id
          bucketItemData.itemId = item.id
          await bucketItemsService.createBucketItem(bucketItemData)
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>