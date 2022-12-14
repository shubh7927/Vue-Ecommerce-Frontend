<template>
  <v-container class="my-5">
    <!-- SearchBar -->
    <v-row class="searchBar">
      <v-text-field
        dark
        rounded
        solo
        placeholder="Search Products Here...."
        prepend-inner-icon="mdi-magnify"
        color="primary"
        v-model="searchText"
        @keyup="handleSearchResults"
      ></v-text-field>
    </v-row>

    <!-- Add Product Button (Admin and SuperaAdmin only) -->
    <v-row class="mb-4" v-if="isUserLoggedIn && (isAdmin || isSuperAdmin)">
      <v-spacer></v-spacer>
      <v-btn text color="purple" :to="{ name: 'addProduct' }">
        <v-icon left>mdi-plus</v-icon>
        Add New Product
      </v-btn>
    </v-row>

    <!-- Skeleton Loaders -->
    <v-row v-if="loading">
      <v-col v-for="n in 3" :key="n">
        <v-skeleton-loader
          dark
          v-bind="attrs"
          type=" image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Error Notification -->
    <v-snackbar v-else-if="error" v-model="snackbar" color="red">
      <v-icon left>mdi-alert-circle</v-icon>
      {{ error.message }}
    </v-snackbar>

    <!-- NoProductsFound -->
    <v-row
      v-else-if="productDisplayList.length == 0"
      class="text-h2 justify-center my-4"
    >
      No Products Found
      <v-icon dark right class="text-h2">mdi-emoticon-sad-outline</v-icon>
    </v-row>

    <!-- Product Cards -->
    <v-row v-else>
      <v-col v-for="product in productDisplayList" :key="product._id">
        <ProductCard
          :name="product.name"
          :price="product.price"
          :category="product.category"
          :productId="product._id"
          :imgLink="product.image.url"
          :rating="product.rating"
        />
      </v-col>
    </v-row>

    <!-- Pagination Buttons -->
    <v-row v-if="productDisplayList.length > 0">
      <v-btn
        text
        dark
        color="purple"
        @click="handlePageDecrease"
        :disabled="params.page == null"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        Previous
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="purple"
        @click="handlePageIncrease"
        dark
        text
        :disabled="productDisplayList.length < 6"
      >
        Next
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { getProductsList } from "@/services/products";
import ProductCard from "@/components/product/ProductCard.vue";
export default {
  name: "AllProducts",
  components: {
    ProductCard,
  },
  data() {
    return {
      tempLink: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      allProductsList: [],
      productDisplayList: [],
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
      snackbar: false,
      loading: false,
      searchText: "",
      currentPage: null,
      error: null,
      params: {
        page: null,
        search: null,
      },
    };
  },
  computed: {
    ...mapGetters(["isUserLoggedIn", "isAdmin", "isSuperAdmin"]),
  },
  methods: {
    async handlePageIncrease() {
      if (this.params.page) {
        this.currentPage++;
      } else {
        this.currentPage = 2;
      }
      this.params.page = this.currentPage;
      await this.alterProductsList();
    },
    async handlePageDecrease() {
      if (this.currentPage == 2) {
        this.currentPage = null;
      } else {
        this.currentPage--;
      }
      this.params.page = this.currentPage;
      await this.alterProductsList();
    },
    async handleSearchResults() {
      if (this.searchText.length > 0) {
        this.params.search = this.searchText;
        this.params.page = null;
      } else {
        this.params.search = null;
        this.params.page = this.currentPage;
      }
      await this.alterProductsList();
    },

    async alterProductsList() {
      try {
        const response = await getProductsList(this.params);
        this.productDisplayList = response.allProducts;
        this.totalProducts = response.totalProducts;
      } catch (error) {
        this.snackbar = true;
        this.error = error;
      }
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const response = await getProductsList(this.params);
      this.allProductsList = response.allProducts;
      this.productDisplayList = this.allProductsList;
    } catch (error) {
      this.error = error;
      this.snackbar = true;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
</style>