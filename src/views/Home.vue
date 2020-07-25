<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top ">
      <router-link class="navbar-brand"
                   to="/">
        Coffee
      </router-link>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse"
           id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/"
                         class="text-light mr-2">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about"
                         class="text-light mr-2">
              關於我們
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products"
                         class="text-light">
              產品列表
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/cart"
                         class="text-light mr-3">
              <i class="fa fa-shopping-cart text-light fa-2x"
                 aria-hidden="true"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/products"
                         class="text-light">
              後台管理
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
};
</script>
