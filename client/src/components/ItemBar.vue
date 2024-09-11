<script setup>
import { AppState } from "@/AppState.js";
import { computed } from "vue";
import { useRoute } from "vue-router";

const itemFormActive = computed(() => AppState.itemForm)
const bucketFormActive = computed(() => AppState.bucketForm)
const route = useRoute()

function setForm(form) {
  AppState[form] = !AppState[form]
}

</script>


<template>

  <div
    class="nav-container flex flex-row justify-around rounded-t-lg uppercase text-3xl font-bold protest-guerrilla-regular">

    <button v-if="route.name == 'Item'" @click="setForm('itemForm')"
      :class="[itemFormActive ? 'btn-warn' : 'btn-success']"
      class="nav-btn btn btn-success bg-teal-800/75 hover:bg-teal-800 w-full rounded-t">New Item</button>

    <button v-if="route.name == 'Bucket'" @click="setForm('bucketForm')"
      :class="[bucketFormActive ? 'btn-warn' : 'btn-success']"
      class="nav-btn btn btn-success bg-teal-800/75 hover:bg-teal-800 w-full rounded-t">New Bucket</button>
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