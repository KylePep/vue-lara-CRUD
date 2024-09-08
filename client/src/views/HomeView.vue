<template>
  <div class="flex flex-row bg-teal-900/50 border border-teal-300/25 border-4 p-4 rounded-lg">
    <div v-if="account?.id" class="basis-1/4 bg-teal-800/75 px-2 flex flex-col justify-items-center rounded">
      <h2 class="text-2xl font-bold mb-4 text-center ">Buckets </h2>
      <BucketForm />
      <BucketList />
    </div>

    <div v-if="activeBucket.id" class="basis-1/2 bg-teal-900/25 rounded">
      <ActiveBucket />
    </div>

    <div class="basis-1/4 bg-teal-800/75 ms-auto px-2 flex flex-col justify-items-center rounded">
      <h2 class="text-2xl font-bold mb-4 text-center">Items </h2>
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
import ActiveBucket from "@/components/ActiveBucket.vue";

const account = computed(() => AppState.account)
const activeBucket = computed(() => AppState.activeBucket)

</script>

<style scoped></style>