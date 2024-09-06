<template>
  <div class="auth-container">
    <div v-if="!isAuthenticated">

      <div v-if="state == 'login'">
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-white-700">Email</label>
            <input type="email" id="email" v-model="editable.email" required
              class="mt-1 block w-full p-2 border border-white-300 rounded-md text-black" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-white-700">Password</label>
            <input type="password" id="password" v-model="editable.password" required
              class="mt-1 block w-full p-2 border border-white-300 rounded-md text-black" />
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
            Login
          </button>
          <p>or</p>
          <button @click="state = 'register'"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create an Account
          </button>

        </form>
      </div>

      <div v-else>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-white-700">Name</label>
            <input type="name" id="name" v-model="editable.name" required
              class="mt-1 block w-full p-2 border border-white-300 rounded-md text-black" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-white-700">Email</label>
            <input type="email" id="email" v-model="editable.email" required
              class="mt-1 block w-full p-2 border border-white-300 rounded-md text-black" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-white-700">Password</label>
            <input type="password" id="password" v-model="editable.password" required
              class="mt-1 block w-full p-2 border border-white-300 rounded-md text-black" />
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
            Sign Up
          </button>
          <p>or</p>
          <button @click="state = 'login'" class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Already have an account
          </button>

        </form>
      </div>

    </div>

    <div v-else class="">
      <h2 class="text-2xl uppercase text-bold">Welcome, {{ user?.name }}</h2>
      <button @click="logout" class="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700">
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