<template>
  <div class="inventory">
    <h2>Inventory Management</h2>
    <input v-model="search" class="search" placeholder="Search product..." />

    <div v-for="cat in uniqueCategories" :key="cat" class="category-block">
      <h3>{{ cat }}</h3>
      <table class="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in categoryProducts(cat)" :key="product.id">
            <td>
              <img v-if="product.imageUrl" :src="product.imageUrl" class="thumb" />
              <span v-else>No Image</span>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <span :class="{ low: product.stock < 5, ok: product.stock >= 5 }">
                {{ product.stock < 5 ? 'Low Stock' : 'In Stock' }}
              </span>
            </td>
            <td><button @click="restock(product)">Restock +10</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, computed } from 'vue';

const products = inject('products');
const search = ref('');

const uniqueCategories = computed(() => {
  const set = new Set();
  products.forEach(p => p.category && set.add(p.category));
  return Array.from(set);
});

const categoryProducts = (cat) => {
  return products.filter(
    (p) => p.category === cat && p.name.toLowerCase().includes(search.value.toLowerCase())
  );
};

const restock = (product) => {
  product.stock += 10;
};
</script>

<style scoped>
.inventory {
  padding: 20px;
}

.search {
  padding: 8px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th, .product-table td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: center;
}

.thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.low {
  color: red;
  font-weight: bold;
}

.ok {
  color: green;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #2980b9;
}

.category-block {
  margin-bottom: 40px;
}
</style>