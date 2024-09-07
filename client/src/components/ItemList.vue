<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id" class="mb-2 p-4 border-b border-teal-500">
        <ItemCard :itemProp="item" />

      </li>
    </ul>
  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";
import ItemCard from "./ItemCard.vue";

export default {
  components: {
    ItemCard,
  },
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

    }
  }
}
</script>


<style lang="scss" scoped></style>