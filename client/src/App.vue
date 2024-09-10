<script setup>
import { RouterView } from 'vue-router'
import LoginBar from "./components/LoginBar.vue";
import HeroSection from "./components/HeroSection.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <HeroSection />
    <nav>
      <LoginBar />
      <NavBar />
    </nav>
  </header>
  <main>
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
  text-align: center;
}
</style>
