<template>
  <div class="container mx-auto flex">
    <div v-if="account?.id" class="mx-auto">
      <h2 class="text-2xl font-bold mb-4">Buckets </h2>
      <BucketForm />
      <BucketList />
    </div>

    <div v-if="activeBucket.id" class="mx-auto uppercase font-bold text-5xl text-center">
      {{ activeBucket.name }}
      {{ activeBucket.description }}
    </div>

    <div class="mx-auto">
      <h2 class="text-2xl font-bold mb-4 mx-auto">Items </h2>
      <ItemForm />
      <itemList />
    </div>
  </div>
</template>

<script setup>
import itemList from '../components/ItemList.vue'
import ItemForm from '../components/ItemForm.vue'
import { computed } from "vue";
import { AppState } from "@/AppState.js";
import BucketList from "@/components/BucketList.vue";
import BucketForm from "@/components/BucketForm.vue";

const account = computed(() => AppState.account)
const activeBucket = computed(() => AppState.activeBucket)

</script>

<style scoped></style>