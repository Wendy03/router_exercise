<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link to="/admin/products"
                   class="navbar-brand col-sm-3 col-md-2 mr-0">
        Coffee
      </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item">
          <router-link to="/"
                       class="text-light mr-2">
            回到前台
          </router-link>
          <a href="#"
             @click.prevent="signout"
             class="btn btn-outline-light">
            登出
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      document.cookie = 'hexToken=; expires=; path=/';
      this.$router.push('/');
    },
  },
};
</script>
