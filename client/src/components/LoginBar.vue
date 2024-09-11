<template>

  <div class="auth-container">
    <div v-if="!isAuthenticated">

      <div v-if="state == 'login'">
        <form @submit.prevent="login" class="flex justify-start">
          <div class="flex">
            <div class="mb-4 mx-1">
              <input type="email" id="email" v-model="editable.email" placeholder="Email" required
                class="mt-1 bg-black/75 block w-full p-2 border border-teal-300 rounded-md " />
            </div>
            <div class="mb-4 mx-1">
              <input type="password" id="password" v-model="editable.password" placeholder="Password" required
                class="bg-black/75 mt-1 block w-full p-2 border border-teal-300 rounded-md " />
            </div>
          </div>
          <div class="flex justify-items-center px-4">
            <button type="submit" class="text-lg font-bold  btn btn-success text-outline-sm">
              Login
            </button>
            <p class="text-outline-sm py-5 px-2">or</p>
            <button @click="state = 'register'" class="text-lg font-bold  btn btn-info text-outline-sm">
              Create an Account?
            </button>
          </div>

        </form>
      </div>

      <div v-else>
        <form @submit.prevent="register" class="flex justify-start">
          <div class="flex">
            <div class="mb-4 mx-1">
              <input type="name" id="name" v-model="editable.name" placeholder="Name" required
                class="mt-1 bg-black/75 block w-full p-2 border border-teal-300 rounded-md " />
            </div>
            <div class="mb-4 mx-1">
              <input type="email" id="email" v-model="editable.email" placeholder="Email" required
                class="mt-1 bg-black/75 block w-full p-2 border border-teal-300 rounded-md " />
            </div>
            <div class="mb-4 mx-1">
              <input type="password" id="password" v-model="editable.password" placeholder="Password" required
                class="mt-1 bg-black/75 block w-full p-2 border border-teal-300 rounded-md " />
            </div>
          </div>
          <div class="flex px-4">
            <button type="submit" class="text-lg font-bold py-2 px-4  btn btn-success text-outline-sm ">
              Sign Up
            </button>
            <p class=" text-outline-sm py-5 px-2">or</p>
            <button @click="state = 'login'" class="text-lg font-bold py-2 px-4  btn btn-info text-outline-sm">
              Already have an account?
            </button>
          </div>

        </form>
      </div>

    </div>

    <div v-else class="flex justify-between text-3xl font-bold uppercase text-bold text-outline">
      <RouterLink :to="{ name: 'Home' }">{{ user?.name }}</RouterLink>
      <RouterLink :to="{ name: 'Bucket' }" class="btn btn-info">Buckets</RouterLink>
      <RouterLink :to="{ name: 'Item' }" class="btn btn-info">Items</RouterLink>
      <button @click="logout" class=" btn btn-danger">
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

const isAuthenticated = computed(() => AppState.account?.id)
const state = ref('login')
const user = computed(() => AppState.account)
const editable = ref({})

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
  padding: 0 1rem;
}
</style>