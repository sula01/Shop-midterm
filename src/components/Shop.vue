<template>
  <section class="content">
    <h1 style="font-size: 50px; text-align: center;">Shop</h1>
    <div class="content__inner">
      <div v-if="!isLoading" class="items-list">
        <ShopItem 
          v-for="product in products" 
          :key="product.id" 
          :product="product"
          :order="orders[product.id]"
          style="margin-bottom: 20px;"
          @onOrder="orderProduct"
        />
      </div>
      <img 
        v-else 
        src="../assets/images/" 
        alt="Loading..."
        width="200"
        height="200"
        style="border-radius: 100%;"
      />
    </div>
  </section>
</template>

<script>
  import { httpClient } from '../services/http-client';
  import ShopItem from './ShopItem';

  export default {
    name: 'Shop',
    components: {
      ShopItem
    },
    data() {
      return {
        products: [],
        orders: {},
        isLoading: false
      };
    },
    mounted() {
      this.isLoading = true;
      this.orders = this.getOrders();
      httpClient.get('products')
        .then(({ data }) => this.products = data)
        .finally(() => this.isLoading = false);
    },
    methods: {
      getOrders() {
        return JSON.parse(localStorage.getItem('orders')) || {};
      },
      setOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
      },
      orderProduct({ productId, amount }) {
        this.orders = { ...this.orders, [productId]: { amount } };
        this.setOrders(this.orders);
      }
    }
  };
</script>

<style>
  .content {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    background: rgb(0, 115, 207);
    color: #fff;
  }

  .content__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .items-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
  }
</style>
