<template>
  <div class="flex flex-col">

    <div class="flex justify-between">
      <p @click="[route.name != 'Home' ? setActiveItem(item) : '']"
        :class="[route.name != 'Home' ? 'btn btn-info' : '']" class="font-bold uppercase"><strong>{{ item.name
          }}</strong>
      </p>
      <div>
        <button @click="addBucketItem(item)" v-if="activeBucket"
          class=" btn btn-success text-lg text-outline-sm font-bold">+</button>
      </div>
    </div>
    <p>{{ item.description }}</p>
    <p>${{ item.price }}</p>

  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Item } from "@/models/Item.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";
import { bucketItemsService } from "@/services/bucketItemsService.js";
import { useRoute } from "vue-router";

export default {
  props: {
    itemProp: { type: Item }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      item: computed(() => props.itemProp),
      activeItem: computed(() => AppState.activeItem),
      activeBucket: computed(() => AppState.activeBucket.id),

      setActiveItem(item) {
        AppState.activeItem = {}
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