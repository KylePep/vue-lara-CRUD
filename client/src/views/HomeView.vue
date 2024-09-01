<template>
  <div class="container mx-auto">
    <h2 class="text-2xl font-bold mb-4">Items </h2>
    <ItemForm />
    <itemList />
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