<template>
  <div class="item">
    <img 
      :src="productImage" 
      :alt="product.name" 
      class="item__image"
    />
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
      <p class="item__title">
        {{ product.name }}
      </p>
      <button 
        v-if="order" 
        class="status-btn"
        type="button"
        @click="setStatus"
      >
        {{ 
          statusText !== null
            ? statusText
            : 'Проверить статус'
        }}
      </button>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
      <button 
        class="item__button"
        :class="order ? '--ordered' : ''"
        type="button"
        @click="orderProduct"
      >
        {{
          order ? orderText : 'Купить'
        }}
      </button>
      <div v-if="!order" style="display: flex; align-items: center; justify-content: space-between;">
        <button 
          class="counter-btn"
          :class="itemCounter <= 1 ? '--disabled' : ''"
          style="margin-right: 10px;"
          type="button"
          :disabled="itemCounter <= 1"
          @click="decrementItemCounter"
        >-</button>
        {{ itemCounter }}
        <button 
          class="counter-btn"
          style="margin-left: 10px;"
          type="button"
          @click="incrementItemCounter"
        >+</button>
      </div>
    </div>
  </div>
</template>

<script>
  const STATUSES = ['В пути', 'Ожидается', 'Пакуется', 'Доставляется', 'В пункте назначения', 'Доставлен'];

  export default {
    name: 'ShopItem',
    props: {
      product: {
        type: Object,
        required: true
      },
      order: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        itemCounter: 1,
        status: null
      };
    },
    computed: {
      productImage() {
        return `https://fakestoreapi.com/products/${this.product.name}?width=240&height=240`;
      },
      orderText() {
        return `Заказано ${this.order.amount} ${this.product.name}`;
      },
      statusText() {
        return this.status ? STATUSES[this.status] : null;
      }
    },
    methods: {
      incrementItemCounter() {
        this.itemCounter += 1;
      },
      decrementItemCounter() {
        if (this.itemCounter > 1) {
          this.itemCounter -= 1;
        }
      },
      orderProduct() {
        this.$emit('onOrder', { productId: this.product.id, amount: this.itemCounter });
      },
      setStatus() {
        this.status = Math.floor(Math.random() * (5 + 1));
      }
    }
  };
</script>

<style>
  .item {
    width: 270px;
    padding: 15px;
    background: #fff;
    color: #000;
    border-radius: 8px;
    box-shadow: 0 1px;
  }

  .item__image {
    width: 100%;
    border-radius: 8px;
  }

  .item__title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .item__button {
    padding: 10px 20px;
    background: rgb(253, 165, 0);
    color: #000;
    cursor: pointer;
    border: 0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    transition: 300ms;
  }

  .item__button:hover {
    background-color: rgb(253, 199, 98);
  }

  .item__button.--ordered {
    background-color: rgb(76, 187, 23);
    cursor: default;
  }

  .item__button.--ordered:hover {
    background-color: rgb(76, 187, 23);
  }

  .counter-btn {
    width: 25px;
    height: 25px;
    background: rgb(221, 221, 221);
    border: 0;
    border-radius: 100%;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
  }

  .counter-btn.--disabled {
    cursor: default;
    opacity: 0.8;
  }

  .status-btn {
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    background: rgb(253, 165, 0);
    border-radius: 8px;
  }
</style>