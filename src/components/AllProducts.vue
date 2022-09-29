<template>
  <v-container class="my-5">
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
    <v-row
      class="searchBar mb-4"
      v-if="isUserLoggedIn && (isAdmin || isSuperAdmin)"
    >
      <v-spacer></v-spacer>
      <v-btn text color="purple" :to="{ name: 'addProduct' }">
        <v-icon left>mdi-plus</v-icon>
        Add New Product
      </v-btn>
    </v-row>
    <v-row v-if="loading">
      <v-col v-for="n in 3" :key="n">
        <v-skeleton-loader
          dark
          v-bind="attrs"
          type=" image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-snackbar v-if="error" v-model="snackbar" color="red" :multi-line="true">
      <v-icon left>mdi-alert-circle</v-icon>
      {{ error.message }}

      <template v-slot:action="{ attrs }">
        <v-btn dark fab text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-row v-if="productDisplayList.length > 0">
      <v-col v-for="product in productDisplayList" :key="product._id">
        <ProductCard
          :name="product.name"
          :price="product.price"
          :category="product.category"
          :productId="product._id"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        text
        dark
        color="purple"
        @click="handlePageDecrease"
        :disabled="this.params.page == null"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        Previous
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="purple" @click="handlePageIncrease" dark text>
        Next
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { getProductsList } from "@/services/products";
import ProductCard from "./ProductCard.vue";
export default {
  name: "AllProducts",
  components: {
    ProductCard,
  },
  data() {
    return {
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
    this.loading = true;
    try {
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