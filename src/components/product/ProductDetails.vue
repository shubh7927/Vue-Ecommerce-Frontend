<template>
  <!-- Loader -->
  <v-container class="fill-height" v-if="loading">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="6">
        <v-progress-linear
          color="purple"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <!-- ProductDetails Page -->
  <v-container v-else-if="product" class="my-4">
    <!-- Notifications -->
    <template>
      <v-snackbar v-if="result" v-model="success" tile color="success">
        <v-icon left>mdi-check-circle</v-icon>
        {{ result.message }}
      </v-snackbar>
      <v-snackbar v-if="error" v-model="failure" tile color="error">
        <v-icon left>mdi-cancel</v-icon>
        {{ error.response.data.message }}
      </v-snackbar>
    </template>

    <!-- Edit And Delete Product Buttons (Admin and SuperAdmin only) -->
    <v-row v-if="isUserLoggedIn && (isAdmin || isSuperAdmin)">
      <v-spacer></v-spacer>
      <v-btn
        outlined
        class="mx-3"
        color="success"
        :to="{ name: 'productUpdate', params: { productId } }"
      >
        <v-icon left>mdi-pencil-outline</v-icon>
        Edit
      </v-btn>

      <v-dialog v-model="dialog" dark persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined class="mx-3" color="error" v-bind="attrs" v-on="on">
            Delete
            <v-icon right>mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 text-capitalize">
            are you sure ?
          </v-card-title>
          <v-card-text class="text-capitalize">
            Press OK if you want to delete {{ product.name }}?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey lighten-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteProduct"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Product Details -->
    <v-row align="center">
      <!-- Product Image -->
      <v-col class="d-flex justify-center">
        <v-img
          class="elevation-12 rounded"
          :src="product.image.url"
          max-height="350"
          max-width="350"
          light
        >
        </v-img>
      </v-col>

      <v-col>
        <!-- Product Name -->
        <v-row class="text-sm-h4 text-h5">
          <v-col class="py-0 py-sm-1">
            {{ product.name }}
          </v-col>
        </v-row>

        <!-- Product Price -->
        <v-row class="text-sm-h5 text-h6">
          <v-col class="py-0 py-sm-1">
            ₹ {{ product.price.toLocaleString() }}
          </v-col>
        </v-row>

        <!-- Product Rating -->
        <v-row class="mt-3 mt-sm-4 mb-1 mb-sm-3 justify-start">
          <v-rating
            dense
            half-increments
            readonly
            :value="product.rating"
            color="warning"
            background-color="warning"
            class="ml-2"
          >
          </v-rating>
        </v-row>

        <!-- AddToCart Button(Not for phones)  -->
        <v-row class="hidden-xs-only justify-start">
          <v-col class="col-7">
            <v-btn
              block
              dark
              color="purple"
              class="elevation-10"
              :disabled="!isUserLoggedIn"
              @click="addProductToCart"
            >
              <template v-if="isUserLoggedIn">
                Add to cart
                <v-icon right>mdi-cart-variant</v-icon>
              </template>
              <template v-else> Signin to buy </template>
            </v-btn>
          </v-col>
        </v-row>

        <!-- AddToCart Button(Only for phones)  -->
        <v-row class="hidden-sm-and-up justify-center">
          <v-col class="col-11">
            <v-btn
              block
              dark
              color="purple"
              class="elevation-10"
              :disabled="!isUserLoggedIn"
              @click="addProductToCart"
            >
              <template v-if="isUserLoggedIn">
                Add to cart
                <v-icon right>mdi-cart-variant</v-icon>
              </template>
              <template v-else> Signin to buy </template>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Divider(Horizontal Line) -->
    <v-divider dark class="mt-5 mb-3"></v-divider>

    <!-- Key Specifications Section -->
    <v-row justify="center">
      <v-col
        class="
          col-10
          d-flex
          justify-center
          text-h5 text-md-h4
          font-weight-bold
          text-decoration-underline
        "
      >
        Key Specifications
      </v-col>

      <v-row justify="center">
        <v-col class="col-11 d-flex flex-column">
          <div
            class="my-1 ml-sm-5"
            justify="center"
            v-for="(description, idx) in product.description.split('\n')"
            :key="idx"
          >
            <v-icon color="purple">mdi-circle-medium</v-icon>
            {{ description }}
          </div>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingleProduct, deleteProductById } from "@/services/products.js";
import { addToCart } from "@/services/users.js";
export default {
  name: "ProductDetails",
  data() {
    return {
      productId: null,
      product: null,
      loading: false,
      error: null,
      dialog: false,
      result: null,
      success: false,
      failure: false,
    };
  },
  computed: {
    ...mapGetters(["isUserLoggedIn", "isAdmin", "isSuperAdmin"]),
  },
  methods: {
    async deleteProduct() {
      try {
        const response = await deleteProductById(this.productId);
        this.result = response;
        this.failure = false;
        this.success = true;
        this.$router.push({
          name: "allProducts",
        });
      } catch (error) {
        this.error = error;
        this.failure = true;
      } finally {
        this.dialog = false;
      }
    },
    async addProductToCart() {
      try {
        this.result = await addToCart(this.productId);
        this.failure = false;
        this.success = true;
      } catch (error) {
        this.error = error;
        this.failure = true;
      }
    },
  },
  async mounted() {
    this.loading = true;
    this.productId = this.$route.params.productId;
    try {
      this.product = await getSingleProduct(this.productId);
    } catch (error) {
      this.error = error;
      this.failure = true;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
</style>