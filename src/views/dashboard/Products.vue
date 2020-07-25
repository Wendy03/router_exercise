<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary"
              @click="openModal('new')">
        建立新產品
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th width="140"
                class="text-nowrap">分類</th>
            <th>產品名稱</th>
            <th width="120"
                class="text-nowrap">原價</th>
            <th width="120"
                class="text-nowrap">售價</th>
            <th width="100"
                class="text-nowrap">是否啟用</th>
            <th width="140"
                class="text-nowrap">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products"
              :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price | money}}</td>
            <td>{{ item.price | money}}</td>
            <td>
              <span v-if="item.enabled"
                    class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm mr-1"
                      @click.prevent="openModal('edit', item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm"
                      @click.prevent="openModal('del',item)">
                刪除
              </button>
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
      products: {},
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
    this.getProducts();
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products`;
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    openModal() { },
    getPorduct() { },
    updateProduct() { },
    uploadFile() { },
    delProduct() { },
  },
};
</script>
