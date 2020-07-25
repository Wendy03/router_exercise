<template>
  <div>
    <div class="table-responsive">
      <table class="table mt-5">
        <thead>
          <tr>
            <th width="140">購買時間</th>
            <th>購買款項</th>
            <th width="140">付款金額</th>
            <th width="140">付款方式</th>
            <th width="140">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortOrder"
              :key="item.id">
            <td>{{ item.created.timestamp | date}}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products"
                    :key="i">
                  {{ product.product.title }} 數量：{{ product.quantity
                          }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-center">{{ item.amount | money}}</td>
            <td class="text-center">{{ item.payment}}</td>
            <td>
              <span v-if="item.paid"
                    class="text-success">已付款</span>
              <span v-else
                    class="muted">未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: {},
      isLoading: true,
    };
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders`;
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.orders = res.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
};
</script>
