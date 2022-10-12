<template>
  <!-- UnauthorisedAccess for Non SignedIn User -->
  <v-container fluid v-if="!isUserLoggedIn">
    <UnauthorisedAccess />
  </v-container>

  <!-- Loader -->
  <v-container class="fill-height" v-else-if="loading">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="4">
        <v-progress-linear
          color="purple"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <!-- Error Message -->
  <v-container class="fill-height" v-else-if="error">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="4" class="text-h5">
        {{ error.response.data.message }}
      </v-col>
    </v-row>
  </v-container>

  <!-- Cart Empty Message -->
  <v-container class="" v-else-if="cartItems.length == 0">
    <v-row justify="center">
      <v-col cols="6" class="">
        Even We cannot find anything in your cart. Add something to your cart.
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn color="purple" :to="{ name: 'allProducts' }" plain>
        Find Items Here
      </v-btn>
    </v-row>
  </v-container>

  <!-- Cart Items -->
  <v-container v-else>
    <!-- Notification -->
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
    <v-row class="my-3"> </v-row>

    <!-- Cart Items Cards -->
    <v-row justify="center">
      <v-col v-for="item in cartItems" :key="item._id" class="col-12 col-sm-7">
        <v-card dark>
          <div class="d-flex flex-no-wrap">
            <!-- Cart Item Image -->
            <v-avatar class="ma-3" size="120" tile>
              <v-img :src="item.product.image.url"></v-img>
            </v-avatar>
            <div>
              <!-- Cart Item Name -->
              <v-card-title class="text-sm-h5">
                {{ item.product.name }}
              </v-card-title>

              <!-- Cart Item Price -->
              <v-card-subtitle>
                ₹ {{ item.product.price.toLocaleString() }}
              </v-card-subtitle>

              <!-- Cart Item Quantity -->
              <v-card-subtitle class="py-0 my-0">
                {{ item.quantity }} {{ item.quantity > 1 ? "Units" : "Unit" }}
              </v-card-subtitle>

              <!-- Remove From Cart Button -->
              <v-card-actions>
                <v-btn
                  class="ml-2 mt-5"
                  color="error"
                  plain
                  @click="removeProductFromCart(item.product._id)"
                >
                  Remove
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Order and Pay Button -->
      <v-col class="col-12 col-sm-7 d-flex justify-center">
        <v-btn color="purple" @click="placeOrder" dark large tile block>
          Checkout & Pay ₹ {{ totalAmount }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteFromCart, viewMyCart } from "@/services/users.js";
import { placeNewOrder } from "@/services/orders.js";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
export default {
  name: "MyCart",
  components: {
    UnauthorisedAccess,
  },
  data() {
    return {
      cartItems: [],
      loading: false,
      success: false,
      failure: false,
      result: null,
      error: null,
    };
  },
  computed: {
    totalAmount() {
      let amount = 0;
      this.cartItems.forEach((item) => {
        amount += item.product.price * item.quantity;
      });
      return amount.toLocaleString();
    },
    ...mapGetters(["isUserLoggedIn"]),
  },
  methods: {
    async getCartItems() {
      this.cartItems = await viewMyCart();
    },
    async removeProductFromCart(id) {
      try {
        this.result = await deleteFromCart(id);
        await this.getCartItems();
        this.failure = false;
        this.success = true;
      } catch (error) {
        this.error = error;
        this.failure = true;
      }
    },
    async placeOrder() {
      try {
        this.result = await placeNewOrder();
        this.failure = false;
        this.success = true;
      } catch (error) {
        this.error = error;
        this.failure = true;
      }
    },
  },
  async mounted() {
    try {
      this.loading = true;
      await this.getCartItems();
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
</style>