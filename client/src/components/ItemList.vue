<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id" class="mb-2 p-4 border-b">
        <p><strong>{{ item.name }}</strong></p>
        <p>{{ item.description }}</p>
        <p>${{ item.price }}</p>
        <button @click="deleteItem(item.id)" class="text-red-500">Delete</button>
      </li>
    </ul>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { itemsService } from "@/services/ItemsService.js";
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
      items: computed(() => AppState.items)
    }
  }
}
</script>


<style lang="scss" scoped></style>