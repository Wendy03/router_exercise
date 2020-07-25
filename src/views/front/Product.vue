<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="conatiner mx-5 mt-5">
      <h2 class="mt-5">商品內容</h2>
      <div class="row my-5">
        <div class="col-md-6">
          <div style="height: 350px;
          background-size: cover;
          background-position: center;"
               :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
        </div>
        <div class="col-md-6">
          <h5>{{ product.title }}</h5>
          <p>單價 NT{{ product.price }}</p>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: '',
      },
      product: [],
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      const vm = this;
      const { id } = vm.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`;

      vm.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          vm.isLoading = false;
          vm.product = res.data.data;
        })
        .catch((err) => {
          vm.isLoading = false;
          console.log(err);
        });
    },
    addToCart() { },
  },
};
</script>
