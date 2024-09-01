<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-4">Items Management</h1>
    <itemList />
    <ItemForm />
  </div>
</template>

<script>
import itemList from '../components/ItemList.vue'
import ItemForm from '../components/ItemForm.vue'

export default {
  components: {
    itemList,
    ItemForm
  }
}
</script>

<style scoped></style>