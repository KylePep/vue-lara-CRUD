<script setup>
import { ref } from "vue";
import ItemForm from "./ItemForm.vue";
import ItemList from "./ItemList.vue";
import MyItemList from "./MyItemList.vue";
const mode = ref('public')
</script>


<template>
  <div class="basis-1/4 bg-teal-800/75 ms-auto px-2 flex flex-col justify-items-center rounded">
    <div v-if="mode != 'public'">
      <h2 class="text-2xl font-bold text-center">Your Items </h2>
      <button @click="mode = 'public'" class="text-base font-bold btn btn-info text-center w-full">Public Items</button>
      <ItemForm />
      <MyItemList />
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold text-center">Public Items </h2>
      <button @click="mode = 'private'" class="text-base font-bold btn btn-info text-center w-full">Your Items</button>
      <ItemForm />
      <ItemList />
    </div>
  </div>
</template>


<style lang="scss" scoped></style>