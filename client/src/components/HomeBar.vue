<script setup>
import { AppState } from "@/AppState.js";
import { bucketService } from "@/services/BucketService.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";

const activeBucket = computed(() => AppState.activeBucket)
const itemFormActive = computed(() => AppState.itemForm)
const bucketFormActive = computed(() => AppState.bucketForm)

function setForm(form) {
  AppState[form] = !AppState[form]
}


async function checkBucket() {
  try {
    const bucketId = AppState.activeBucket.id
    await bucketService.checkBucket(bucketId)
  } catch (error) {
    Pop.error(error.message, '[Kick error, Something went wrong]')
  }
}
</script>


<template>

  <div
    class="nav-container flex flex-row justify-around rounded-t-lg uppercase text-3xl font-bold protest-guerrilla-regular">

    <button @click="setForm('bucketForm')" :class="[bucketFormActive ? 'btn-warn' : 'btn-success']"
      class=" nav-btn btn btn-success bg-teal-800/75 hover:bg-teal-800  w-full rounded-t me-2">New Bucket</button>

    <button @click="checkBucket()" v-if="activeBucket.id" class="w-full mx-2">
      <div :class="[activeBucket.checked == false ? 'btn btn-warn' : 'btn btn-check']"
        class="nav-btn bg-teal-800/75 hover:bg-teal-800 w-full rounded-t">
        <p class="uppercase">
          {{ activeBucket.checked ? 'Kicked' : 'Kick' }}
        </p>
      </div>
    </button>

    <button v-else class=" w-full mx-2"></button>

    <button @click="setForm('itemForm')" :class="[itemFormActive ? 'btn-warn' : 'btn-success']"
      class="nav-btn btn btn-success bg-teal-800/75 hover:bg-teal-800 w-full rounded-t ms-2">New Item</button>
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