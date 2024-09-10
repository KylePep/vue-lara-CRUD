<script setup>
import { AppState } from "@/AppState.js";
import { computed } from "vue";

const activeBucket = computed(() => AppState.activeBucket)
</script>


<template>
  <div
    class="nav-container flex flex-row justify-around rounded-t-lg uppercase text-3xl font-bold protest-guerrilla-regular">

    <button class=" nav-btn btn btn-success bg-teal-800/75 hover:bg-teal-800  w-full rounded-t me-2">New Bucket</button>

    <button v-if="activeBucket.id" class="w-full mx-2">
      <div v-if="activeBucket.checked == false"
        class="btn-warn btn nav-btn bg-teal-800/75 hover:bg-teal-800 w-full rounded-t">
        <p class="uppercase">
          KICK
        </p>
      </div>
      <div v-else class="btn-check btn nav-btn bg-teal-800/75 hover:bg-teal-800 w-full rounded-t">
        <p class="line-through rotate-180 uppercase">
          Kicked
        </p>
      </div>

    </button>
    <button v-else class=" w-full mx-2"></button>

    <button class="nav-btn btn btn-success bg-teal-800/75 hover:bg-teal-800 w-full rounded-t ms-2">New Item</button>

  </div>
</template>


<style lang="scss" scoped>
.protest-guerrilla-regular {
  letter-spacing: .35rem;
}

.nav-container {
  min-height: 4rem;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 4rem;
}
</style>