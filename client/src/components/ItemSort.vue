<script setup>
import ItemForm from "./ItemForm.vue";
import MyItemList from "./MyItemList.vue";
</script>


<template>
  <div class="basis-1/4 bg-teal-800/75 ms-auto px-2 flex flex-col justify-items-center rounded">
    <h2 class="text-2xl font-bold text-center">Your Items </h2>
    <ItemForm />
    <MyItemList />
  </div>
</template>


<style lang="scss" scoped></style>