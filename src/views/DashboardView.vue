<template>
  <div class="layout">
    <aside class="sidebar">
      <h2 class="logo">Forsit Admin</h2>
      <ul class="menu">
        <li :class="{ active: page === 'revenue' }" @click="page = 'revenue'">Revenue</li>
        <li :class="{ active: page === 'inventory' }" @click="page = 'inventory'">Inventory</li>
        <li :class="{ active: page === 'addProduct' }" @click="page = 'addProduct'">Add Product</li>
      </ul>
    </aside>
    <main class="main">
      <header class="header">
        <h1>{{ currentPageName }}</h1>
      </header>
      <section class="content">
        <component :is="currentPageComponent"></component>
      </section>
    </main>
  </div>
</template>

<script>
import RevenueAnalysis from '../components/RevenueAnalysis.vue';
import InventoryManagement from '../components/InventoryManagement.vue';
import ProductForm from '../components/ProductForm.vue';

export default {
  data() {
    return { page: 'revenue' };
  },
  computed: {
    currentPageComponent() {
      switch (this.page) {
        case 'inventory': return InventoryManagement;
        case 'addProduct': return ProductForm;
        default: return RevenueAnalysis;
      }
    },
    currentPageName() {
      switch (this.page) {
        case 'inventory': return 'Inventory Management';
        case 'addProduct': return 'Add New Product';
        default: return 'Revenue Analysis';
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.layout {
  display: flex;
  font-family: 'Times New Roman', Times, serif;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background-color: #110f0f;
  color: white;
  padding: 20px;
}

.logo {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.menu li.active,
.menu li:hover {
  background-color: #34495e;
}

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
}

.header {
  padding: 20px;
  background: white;
  border-bottom: 1px solid #ccc;
  font-size: 24px;
  font-weight: 600;
}

.content {
  padding: 30px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
