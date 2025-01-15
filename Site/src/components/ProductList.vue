<template>
  <div class="product-list">
    <div class="product-card" v-for="product in products" :key="product.id">
      <img :src="product.image" :alt="product.name" />
      <button @click="addToCart(product)">Adicionar ao carrinho</button>
      <h3>{{ product.name }}</h3>
      <p><strong>R${{ product.price }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: Array,
    addToCart: Function,
  },
};
</script>


<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.product-card {

  padding: 1rem;
  text-align: center;
  width: 200px;
}

.product-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.product-card button {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.product-card button:hover {

  background-color: #07488f;

}
</style>
