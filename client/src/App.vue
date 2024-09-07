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

<style>
@import url('https://fonts.googleapis.com/css2?family=Protest+Guerrilla&display=swap');

.protest-guerrilla-regular {
  font-family: "Protest Guerrilla", sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 1.5rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
</style>
