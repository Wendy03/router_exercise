<template>
  <div>
    <div class="conatiner mx-5 my-5">
      <div class="col-md-12">
        <div class="mb-2">
          <h5>已選擇商品</h5>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="text-right mb-3">
              <button type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeAllCartItem()">
                <i class="far fa-trash-alt"> 刪除所有品項</i>
              </button>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <th scope="col"
                      class="text-nowrap">
                    刪除
                  </th>
                  <th scope="col"
                      class="text-nowrap">
                    品名
                  </th>
                  <th scope="col"
                      width="150px"
                      class="text-nowrap">
                    數量
                  </th>
                  <th scope="col"
                      class="text-nowrap">
                    單位
                  </th>
                  <th scope="col"
                      class="text-nowrap">
                    單價
                  </th>
                </thead>
                <tbody>
                  <tr v-for="item in carts"
                      :key="item.product.id + 1">
                    <td class="align-middle">
                      <button type="button"
                              class="btn btn-outline-danger btn-sm"
                              @click="removeCartItem(item.product.id)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      {{ item.product.title }}
                    </td>
                    <td class="align-middle">
                      <div class="input-group">
                        <div class="input-group-append">
                          <button class="btn btn-outline-primary btn-sm"
                                  @click="quantityUpdate(item.product.id, item.quantity - 1)"
                                  :disabled="item.quantity === 1">
                            -
                          </button>
                        </div>
                        <input id="inlineFormInputGroupUsername"
                               type="number"
                               class="form-control text-center"
                               :value="item.quantity"
                               disabled />
                        <div class="input-group-prepend">
                          <button class="btn btn-outline-primary btn-sm"
                                  @click="quantityUpdate(item.product.id, item.quantity + 1)"
                                  :disabled="item.quantity === 5">
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle">
                      {{ item.product.unit }}
                    </td>
                    <td class="align-middle">
                      {{ item.product.price}}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4"
                        class="text-right">
                      總計
                    </td>
                    <td class="text-right">
                      {{ cartTotal}}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="input-group w-50">
              <input type="text"
                     class="form-control rounded-0
                     border-bottom border-top-0 border-left-0 border-right-0 shadow-none"
                     placeholder="Coupon Code"
                     aria-label="Recipient's username"
                     aria-describedby="button-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-dark
                border-bottom border-top-0 border-left-0 border-right-0 rounded-0"
                        type="button"
                        id="button-addon2"><i class="fas fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border p-4 mb-4">
              <h4 class="font-weight-bold mb-4">Order Detail</h4>
              <table class="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th scope="row"
                        class="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                    <td class="text-right border-0 px-0 pt-4">NT{{ cartTotal}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 font-weight-bold">Total</p>
                <p class="mb-0 h4 font-weight-bold">NT{{ cartTotal}}</p>
              </div>
              <router-link to="/checkout"
                           class="btn btn-dark float-right mt-5"
                           v-if="carts.length > 0">
                付款
              </router-link>
            </div>
          </div>
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
      carts: {},
      cartTotal: 0,
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url)
        .then((res) => {
          vm.isLoading = false;
          vm.carts = res.data.data;
          vm.updateTotal();
        })
        .catch((err) => {
          console.log(err);
          vm.isLoading = false;
        });
    },
    updateTotal() {
      const vm = this;
      let total = 0;
      vm.carts.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      vm.cartTotal = total;
    },
    quantityUpdate() { },
    removeAllCartItem() { },
    removeCartItem() { },
  },
};
</script>
