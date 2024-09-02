<template>
  <div>
    <p class="font-bold uppercase"><strong>{{ bucket.name }}</strong></p>
    <p>{{ bucket.description }}</p>
    <button @click="setActiveBucket(bucket)" class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
      SELECT
    </button>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Item } from "@/models/Item.js";
import { computed } from "vue";

export default {
  props: {
    bucketProp: { type: Item }
  },
  setup(props) {
    return {
      bucket: computed(() => props.bucketProp),

      setActiveBucket(bucket) {
        AppState.activeBucket = bucket;
      },

      // async deleteItem(item) {
      //   try {
      //     const confirmDelete = await Pop.confirm(`Delete ${item.name}`)
      //     if (!confirmDelete) {
      //       return
      //     }
      //     const itemId = item.id
      //     await itemsService.deleteItem(itemId)
      //   } catch (error) {
      //     Pop.error(error.message, '[Failed to delete Item]')
      //   }
      // }
    }
  }
}
</script>


<style lang="scss" scoped></style>