<template>
  <HomeBar />
  <div class="content-container flex flex-row bg-teal-900/50 border-t border-teal-300/25 border-4 p-4 rounded-b-lg">
    <div v-if="account?.id" class="basis-1/4 bg-teal-800/75 px-2 flex flex-col justify-items-center rounded">
      <h2 class="text-2xl font-bold mb-4 text-center ">Buckets </h2>
      <BucketForm />
      <BucketList />
    </div>

    <div v-if="activeBucket.id" class="basis-1/2 bg-teal-900/25 rounded">
      <ActiveBucket />
    </div>

    <ItemSort />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { AppState } from "@/AppState.js";
import BucketList from "@/components/BucketList.vue";
import BucketForm from "@/components/BucketForm.vue";
import ActiveBucket from "@/components/ActiveBucket.vue";
import ItemSort from "@/components/ItemSort.vue";
import HomeBar from "@/components/HomeBar.vue";

const account = computed(() => AppState.account)
const activeBucket = computed(() => AppState.activeBucket)

</script>

<style scoped>
.content-container {
  min-height: 60vh;
}
</style>