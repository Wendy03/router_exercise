<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 mb-2 my-5">
          <ul class="list-group sticky-top">
            <li class="list-group-item active">全部商品</li>
            <li class="list-group-item">中焙咖啡豆</li>
            <li class="list-group-item">淺焙咖啡豆</li>
            <li class="list-group-item">周邊商品</li>
          </ul>
        </div>
        <div class="col-md-9 my-5">
          <div class="row">
            <div class="col-md-4 col-sm-6 mb-3 mb-4"
                 v-for="item in products"
                 :key="item.id">
              <div class="card border-0 shadow-sm h-100">
                <div style="
                    height: 170px;
                    background-size: cover;
                    background-position: center;
                  "
                     :style="{ backgroundImage: `url(${item.imageUrl[0]})` }">
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">
                    {{ item.category }}
                  </span>
                  <h5 class="card-title">
                    <a href="#"
                       class="text-dark">{{ item.title }}</a>
                  </h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div class="text-right pr-2">
                    {{ item.price | money}} 元
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <router-link :to="`/product/${item.id}`"
                               class="btn btn-outline-secondary btn-sm">
                    查看更多
                  </router-link>
                  <button type="button"
                          class="btn btn-outline-danger btn-sm ml-auto"
                          @click="addToCart(item.id)">
                    <i class="fas fa-spinner fa-spin"
                       v-if="status.loadingItem === item.id">
                    </i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '../../utils/Toast';

export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: '',
      },
      products: {},
      carts: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          vm.isLoading = false;
          vm.products = res.data.data;
        })
        .catch((err) => {
          vm.isLoading = false;
          console.log(err);
        });
    },
    addToCart(id, quantity = 1) {
      const vm = this;
      vm.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http.post(url, cart)
        .then(() => {
          vm.status.loadingItem = '';
          Toast.fire({
            title: '已加入購物車',
            icon: 'success',
          });
        })
        .catch((err) => {
          this.status.loadingItem = '';
          Toast.fire({
            title: `${err.response.data.errors}`,
            icon: 'warning',
          });
        });
    },
  },
};
</script>
