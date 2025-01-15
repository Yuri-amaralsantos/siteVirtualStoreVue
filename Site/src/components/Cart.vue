<template>
    <div class="cart-section">
        <h2 class="cart-title">Carrinho</h2>
        <div class="cart-table-header">
            <span>Produto</span>
            <span>Quantidade</span>
            <span>Total</span>
            <span>Ação</span>
        </div>
        <div class="cart-table">
            <div class="cart-item" v-for="(item, index) in cart" :key="item.id">
                <span>{{ item.name }}</span>
                <span>
                    <input type="number" v-model.number="item.quantity" min="1" @change="updateCart(index)" />
                </span>
                <span>R${{ calculateItemTotal(item) }}</span>
                <span>
                    <button @click="removeFromCart(index)">Remove</button>
                </span>
            </div>
        </div>
        <h3 class="cart-total" v-if="cart.length > 0">Total: R${{ calculateCartTotal() }}</h3>
        <p v-else>Seu carrinho está vazio.</p>
    </div>
</template>

<script>
export default {
    name: "Cart",
    props: {
        cart: Array,
        updateCart: Function,
        removeFromCart: Function,
        calculateItemTotal: Function,
        calculateCartTotal: Function,
    },
};
</script>

<style scoped>
.cart-section {
    border-radius: 8px;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 1rem;
    padding-top: 0.2rem;
    min-height: 180px;

    max-width: 1000px;

    /* Add space for the footer */
}

.cart-title {
    margin: 0 0.5;
    font-weight: 700;

    font-size: 20px;

}

.cart-table-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-right: 1rem;
    padding-bottom: 0.5rem;
    font-weight: 600;
    background-color: #f1f1f1;
}

.cart-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    max-height: 100px;
    gap: 0.5rem;
    /* Set the maximum height for scrolling */
    overflow-y: scroll;
    /* Enable vertical scrolling for cart items */
}

.cart-item {
    display: contents;
}

.cart-table span {}

.cart-section input {
    width: 50px;
    text-align: center;
}

.cart-section button {
    padding: 0.3rem 0.6rem;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.cart-total {
    background-color: #fff;
    font-size: 16px;



}
</style>
