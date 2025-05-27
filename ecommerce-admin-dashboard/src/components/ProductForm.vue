<template>
  <div class="product-form">
    <h2>Add New Product</h2>
    <form @submit.prevent="addProduct">
      <label>Category</label>
      <select v-model="category" required>
        <option disabled value="">Select Category</option>
        <option>Electronics</option>
        <option>Books</option>
        <option>Fashion</option>
        <option>Home</option>
      </select>

      <label>Product Name</label>
      <input v-model="name" required />

      <label>Description</label>
      <input v-model="description" required />

      <label>Price</label>
      <input type="number" v-model="price" required />

      <label>Initial Stock</label>
      <input type="number" v-model="stock" required />

      <label>Upload Image</label>
      <input type="file" @change="uploadImage" />
      <img v-if="imageUrl" :src="imageUrl" class="preview" />

      <button type="submit">Add Product</button>
    </form>

    <div v-if="message" class="success">{{ message }}</div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';

const products = inject('products');

const name = ref('');
const description = ref('');
const price = ref(0);
const stock = ref(0);
const category = ref('');
const image = ref(null);
const imageUrl = ref('');
const message = ref('');

const uploadImage = (e) => {
  image.value = e.target.files[0];
  imageUrl.value = URL.createObjectURL(image.value);
};

const addProduct = () => {
  const newProduct = {
    id: Date.now(),
    name: name.value,
    description: description.value,
    price: price.value,
    stock: stock.value,
    category: category.value,
    imageUrl: imageUrl.value
  };

  products.push(newProduct);
  message.value = `✅ "${newProduct.name}" added successfully!`;

  // Reset
  name.value = '';
  description.value = '';
  price.value = 0;
  stock.value = 0;
  category.value = '';
  image.value = null;
  imageUrl.value = '';
};
</script>


<style scoped>
.product-form {
  max-width: 500px;
  margin: auto;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.preview {
  margin-top: 10px;
  max-width: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #27ae60;
}

.success {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>
