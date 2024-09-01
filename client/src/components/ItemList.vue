<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id" class="mb-2 p-4 border-b">
        <p class="font-bold uppercase"><strong>{{ item.name }}</strong></p>
        <p>{{ item.description }}</p>
        <p>${{ item.price }}</p>
        <button v-if="activeItem != item" @click="setActiveItem(item)"
          class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
          INFO
        </button>
        <div v-else>
          <button @click="deleteItem(item)" class="bg-red-500 hover:bg-red-700 py-1 px-2 rounded">DELETE</button>
          <button @click="setActiveItem()" class="bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded">X</button>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { itemsService } from "@/services/ItemsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";

export default {
  setup() {

    async function getItems() {
      try {

        await itemsService.getItems()
      } catch (error) {
        Pop.error(error.message, '[Failed to get Items]')
      }
    }

    onMounted(() => {
      getItems()
    })
    return {
      items: computed(() => AppState.items),
      activeItem: computed(() => AppState.activeItem),
      setActiveItem(item) {
        AppState.activeItem = item;
      },

      async deleteItem(item) {
        try {
          logger.log(item.id)
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