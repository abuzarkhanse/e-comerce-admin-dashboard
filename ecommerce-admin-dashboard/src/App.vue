<script setup>
import { reactive, provide } from 'vue';

// Correctly import local image assets
const products = reactive([
  {
    id: 1,
    name: 'Kindle',
    stock: 10,
    category: 'Electronics',
    imageUrl: new URL('@/assets/kindle.jpg', import.meta.url).href
  },
  {
    id: 2,
    name: 'Notebook',
    stock: 5,
    category: 'Books',
    imageUrl: new URL('@/assets/notebook.jpg', import.meta.url).href
  },
  {
    id: 3,
    name: 'T-shirt',
    stock: 8,
    category: 'Fashion',
    imageUrl: new URL('@/assets/t-shirt.jpg', import.meta.url).href
  },
  {
    id: 4,
    name: 'Lamp',
    stock: 6,
    category: 'Home',
    imageUrl: new URL('@/assets/lamp.jpg', import.meta.url).href
  },
  {
    id: 5,
    name: 'AirPods',
    stock: 15,
    category: 'Electronics',
    imageUrl: new URL('@/assets/airpod.jpg', import.meta.url).href
  },
  {
    id: 6,
    name: 'Sofa Cover',
    stock: 3,
    category: 'Home',
    imageUrl: new URL('@/assets/sofa-cover.jpg', import.meta.url).href
  }
]);

provide('products', products);
</script>

<template>
  <router-view />
</template>
