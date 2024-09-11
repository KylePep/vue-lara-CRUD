<template>
  <div class="flex flex-col justify-around content-center h-full text-center text-3xl">

    <div v-if="!editMode" class="flex flex-col justify-around content-center h-full">
      <p class="font-bold uppercase text-5xl">{{ item.name
        }}
      </p>
      <p>{{ item.description }}</p>
      <p>$ {{ item.price }}</p>
    </div>

    <div v-else class="">
      <ItemEditForm @itemEdited="editMode = !editMode" />
    </div>


    <button @click="editMode = !editMode" class="btn btn-warn uppercase font-bold">
      {{ editMode ? "Cancel" : "Edit" }}
    </button>

  </div>
</template>


<script>
import { AppState } from "@/AppState.js";
import { Item } from "@/models/Item.js";
import { itemsService } from "@/services/ItemsService.js";
import Pop from "@/utils/Pop.js";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import ItemEditForm from "./ItemEditForm.vue";

export default {
  props: {
    itemProp: { type: Item }
  },
  components: {
    ItemEditForm
  },
  setup(props) {
    const route = useRoute()
    const editMode = ref(false)
    return {
      route,
      editMode,
      item: computed(() => props.itemProp),
      activeItem: computed(() => AppState.activeItem),
      activeBucket: computed(() => AppState.activeBucket.id),

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