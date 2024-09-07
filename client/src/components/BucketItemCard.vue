<template>
  <div class="flex flex-col text-l my-3 border-b border-teal-500/75 pb-4 mx-2">
    <div class="relative" v-if="editable.edit == false || activeItem != item">
      <div class="flex justify-center">
        <button v-if="checked == false" @click="checked = !checked" class="font-bold uppercase btn-info"><strong>{{
          item.name }}</strong>
        </button>
        <button v-else @click="checked = !checked" class="font-bold line-through uppercase btn-warn"><strong>{{
          item.name
        }}</strong>
        </button>
      </div>
      <div class="absolute top-0 right-0">
        <button @click="removeBucketItem(item)" v-if="activeBucket" class="px-1 py-0 btn-danger">-</button>
      </div>
      <div class="absolute top-0 left-0 text-base px-5 font-medium">{{ itemIndex + 1 }}</div>
      <p class="text-xs font-medium">{{ item.description }}</p>
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
    itemProp: { type: Item },
    index: { type: Number }
  },
  setup(props) {
    const editable = ref({})
    const checked = ref(false)
    editable.value.edit = false
    return {
      item: computed(() => props.itemProp),
      itemIndex: computed(() => props.index),
      checked,
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
          const confirmDelete = await Pop.confirm(`Delete ${item.name}`)
          if (!confirmDelete) {
            return
          }
          const bucketItemData = {}
          bucketItemData.bucketId = AppState.activeBucket.id
          bucketItemData.itemId = item.id
          bucketItemData.bucketItemId = item.bucketItemId
          await bucketItemsService.removeBucketItem(bucketItemData)
        } catch (error) {
          Pop.error(error.message, '[]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>