<template>
  <div class="landing-page">
    <nav class="mobile-nav">
      <button @click="toggleCart" class="cart-button">Carrinho ({{ cart.length }})</button>
      <a href="#about">Sobre</a>
      <a href="#contact">Contato</a>
    </nav>
    <header class="header">
      <div class="logo">Loja Virtual</div>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Buscar produto..." />
      </div>
      <nav class="nav">
        <a href="#about">Sobre</a>
        <a href="#contact">Contato</a>
        <button @click="toggleCart" class="cart-button">Carrinho ({{ cart.length }})</button>
      </nav>
    </header>


    <section class="hero">
      <h1>Bem vindo à loja virtual</h1>
      <p>Os melhores produtos você encontra aqui!</p>
    </section>

    <section id="products" class="products">


      <div class="categories">
        <button v-for="category in categories" :key="category" @click="selectCategory(category)"
          :class="{ active: selectedCategory === category }">
          {{ category }}
        </button>
      </div>

      <div class="product-list">
        <ProductList :products="filteredProducts" :addToCart="addToCart" />
      </div>
    </section>

    <section id="about" class="about">
      <h2>Sobre</h2>
      <p>Sempre oferecendo os melhores produtos pelos melhores preços.</p>
    </section>

    <section id="contact" class="contact">
      <h2>Contato</h2>
      <p>Email: email@virtualstore.com.br</p>
      <p>Celular: 099 99999-9999</p>
    </section>

    <div v-if="isCartVisible" class="cart-modal">
      <Cart :cart="cart" :updateCart="updateCart" :removeFromCart="removeFromCart"
        :calculateItemTotal="calculateItemTotal" :calculateCartTotal="calculateCartTotal" />
    </div>

    <footer class="footer">
      <p>&copy; 2025 Loja virtual. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';
import ProductList from './components/ProductList.vue';
import Cart from './components/Cart.vue';
import './assets/mainStyle.css';
import './assets/mobile.css'

export default {
  name: "App",
  components: {
    ProductList,
    Cart
  },
  data() {
    return {
      categories: ['Tudo', 'Eletronicos', 'Moda', 'Casa e Banho', 'Esportes'],
      selectedCategory: 'Tudo',
      searchQuery: '', // New search query
      products: [
        { id: 1, name: "Laptop", price: 1000.00, image: "/images/laptop.jpg", category: 'Eletronicos' },
        { id: 2, name: "Smartphone", price: 500.00, image: "/images/phone.jpg", category: 'Eletronicos' },
        { id: 3, name: "Tablet", price: 300.00, image: "/images/tablet.jpg", category: 'Eletronicos' },
        { id: 4, name: "Camisa", price: 20.00, image: "/images/shirt.jpg", category: 'Moda' },
        { id: 5, name: "Maquina de café", price: 100.00, image: "/images/coffee-maker.jpg", category: 'Casa e Banho' },
        { id: 6, name: "Bola", price: 25.00, image: "/images/ball.jpg", category: 'Esportes' },
        // ... more products
      ],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      isCartVisible: false,
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      // Filter by category
      if (this.selectedCategory !== 'Tudo') {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }

      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    }
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    updateCart(index) {
      if (this.cart[index].quantity <= 0) {
        this.removeFromCart(index);
      }
    },
    calculateItemTotal(item) {
      return (item.price * item.quantity).toFixed(2);
    },
    calculateCartTotal() {
      return this.cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    }
  },
};
</script>

<style></style>
