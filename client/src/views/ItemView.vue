<template>
  <ItemBar />
  <div class="content-container flex flex-row bg-teal-900/50 border-t border-teal-300/25 border-4 p-4 rounded-b-lg">
    <div v-if="activeItem.id" class="basis-3/4 bg-teal-900/25 rounded">
      <ActiveItemCard :itemProp="activeItem" />
    </div>
    <ItemSort />
  </div>
</template>

<script setup>
import { AppState } from "@/AppState.js";
import ActiveItemCard from "@/components/ActiveItemCard.vue";
import ItemBar from "@/components/ItemBar.vue";
import ItemSort from "@/components/ItemSort.vue";
import { computed } from "vue";

const activeItem = computed(() => AppState.activeItem)
</script>

<style>
.content-container {
  min-height: 60vh;
}
</style>
