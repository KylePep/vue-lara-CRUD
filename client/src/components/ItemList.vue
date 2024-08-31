<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id" class="mb-2 p-4 border-b">
        <p><strong>{{ item.name }}</strong></p>
        <p>{{ item.description }}</p>
        <p>${{ item.price }}</p>
        <button @click="deleteItem(item.id)" class="text-red-500">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items');
        this.items = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`http://127.0.0.1:80005/api/items/${id}`);
        this.fetchItems(); // Refresh the list after deletion
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>