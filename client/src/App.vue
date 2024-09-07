<script setup>
import { RouterView } from 'vue-router'
import LoginBar from "./components/LoginBar.vue";
</script>

<template>
  <header>
    <nav>
      <LoginBar />
    </nav>
  </header>
  <main class="container mx-auto">
    <RouterView />
  </main>

</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
</style>
