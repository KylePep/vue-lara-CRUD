<template>
  <form @submit.prevent="submitForm" class="mb-4">
    <div class="mb-2">
      <label class="block">Name</label>
      <input type="text" v-model="name" class="border p-2 w-full" required />
    </div>
    <div class="mb-2">
      <label class="block">Description</label>
      <input type="text" v-model="description" class="border p-2 w-full" />
    </div>
    <div class="mb-2">
      <label class="block">Price</label>
      <input type="number" v-model="price" class="border p-2 w-full" required />
    </div>
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Item</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      description: '',
      price: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const newItem = {
          name: this.name,
          description: this.description,
          price: this.price
        };
        await axios.post('http://127.0.0.1:8000/api/items', newItem);
        this.name = '';
        this.description = '';
        this.price = '';
        this.$emit('itemAdded'); // Notify parent to refresh the list
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
