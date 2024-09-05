<template>
  <div class="flex flex-row ">
    <div v-if="account?.id" class="basis-1/4 bg-teal-800 px-2">
      <h2 class="text-2xl font-bold mb-4">Buckets </h2>
      <BucketForm />
      <BucketList />
    </div>

    <div v-if="activeBucket.id" class="basis-1/2 bg-teal-900">
      <ActiveBucket :bucketProp="activeBucket" />
    </div>

    <div class="basis-1/4 bg-teal-800 ms-auto px-2">
      <h2 class="text-2xl font-bold mb-4 ">Items </h2>
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