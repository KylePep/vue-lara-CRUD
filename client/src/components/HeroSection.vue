<script setup></script>


<template>
  <div class=" hero-container">
    <RouterLink :to="{ name: 'Home' }"
      class="btn btn-info text-6xl mb-4 uppercase text-outline protest-guerrilla-regular">bucket
      list </RouterLink>
    <h2 class="text-base font-bold mb-4  text-outline">What's left before it's done? </h2>
  </div>
</template>


<style lang="scss" scoped>
.hero-container {
  text-align: center;
  padding-top: 4rem;
  max-height: 33vh;
  margin-bottom: 2rem;
}
</style>