<template>
  <h1 class="text-6xl mb-4 uppercase text-outline protest-guerrilla-regular">bucket list </h1>
  <h2 class="text-base font-bold mb-4  text-outline">What's left before it's done? </h2>
  <div class="auth-container">
    <div v-if="!isAuthenticated">

      <div v-if="state == 'login'">
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-white-700">Email</label>
            <input type="email" id="email" v-model="editable.email" required
              class="mt-1 bg-black/75 block w-full p-2 border border-white-300 rounded-md " />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-white-700">Password</label>
            <input type="password" id="password" v-model="editable.password" required
              class="bg-black/75 mt-1 block w-full p-2 border border-white-300 rounded-md " />
          </div>
          <button type="submit" class="text-lg font-bold py-2 px-4  btn btn-success text-outline-sm">
            Login
          </button>
          <p class="text-outline-sm">or</p>
          <button @click="state = 'register'" class="text-lg font-bold py-2 px-4  btn btn-info text-outline-sm">
            Create an Account
          </button>

        </form>
      </div>

      <div v-else>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-white-700">Name</label>
            <input type="name" id="name" v-model="editable.name" required
              class="mt-1 bg-black/75 block w-full p-2 border border-white-300 rounded-md " />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-white-700">Email</label>
            <input type="email" id="email" v-model="editable.email" required
              class="mt-1 bg-black/75 block w-full p-2 border border-white-300 rounded-md " />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-white-700">Password</label>
            <input type="password" id="password" v-model="editable.password" required
              class="mt-1 bg-black/75 block w-full p-2 border border-white-300 rounded-md " />
          </div>
          <button type="submit" class="text-lg font-bold py-2 px-4  btn btn-success text-outline-sm ">
            Sign Up
          </button>
          <p class=" text-outline-sm">or</p>
          <button @click="state = 'login'" class="text-lg font-bold py-2 px-4  btn btn-info text-outline-sm">
            Already have an account
          </button>

        </form>
      </div>

    </div>

    <div v-else class="">
      <h2 class="text-2xl uppercase text-bold text-outline">{{ user?.name }}</h2>
      <button @click="logout" class=" btn btn-danger py-1 px-2 ">
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { AppState } from "@/AppState.js";
import Pop from "@/utils/Pop.js";
import { accountService } from "@/services/AccountService.js";

// State management
const isAuthenticated = computed(() => AppState.account?.id)
const state = ref('login')
const user = computed(() => AppState.account)
const editable = ref({})

// Login function
async function login() {
  try {
    const accountData = editable.value
    await accountService.getAccount(accountData)
    isAuthenticated.value = true
    editable.value = {}
  } catch (error) {
    Pop.error('Something went wrong')
  }
}

// Logout function
async function register() {
  try {
    const accountData = editable.value
    await accountService.createAccount(accountData)
    isAuthenticated.value = true
    editable.value = {}
  } catch (error) {
    Pop.error('Something went wrong')
  }
}

// Logout function
async function logout() {
  try {
    const accountData = editable.value
    await accountService.logOutAccount(accountData)
    isAuthenticated.value = false
    editable.value = {}
    AppState.activeBucket = {}
  } catch (error) {
    Pop.error('Something went wrong')
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>