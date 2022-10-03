<template>
  <v-container class="fill-height" v-if="loading">
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
  <v-container class="fill-height" v-else-if="error">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="4" class="text-h5">
        {{ error.response.data.message }}
      </v-col>
    </v-row>
  </v-container>
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
  <v-container v-else>
    <!-- {{cartItems[0].name}} -->
    <v-row class="my-3"> </v-row>
    <v-row justify="center">
      <v-col class="col-12 col-sm-7 d-flex justify-end">
        <v-btn color="purple" dark large tile>
          Order & Pay ₹ {{ totalAmount }}</v-btn
        >
      </v-col>
      <v-col v-for="item in cartItems" :key="item._id" class="col-12 col-sm-7">
        <v-card dark>
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" size="120" tile>
              <v-img :src="item.product.image.url"></v-img>
            </v-avatar>
            <div>
              <v-card-title class="text-sm-h5">
                {{ item.product.name }}
              </v-card-title>

              <v-card-subtitle>
                ₹ {{ item.product.price.toLocaleString() }}
              </v-card-subtitle>
              <v-card-subtitle class="py-0 my-0">
                {{ item.quantity }} {{ item.quantity > 1 ? "Units" : "Unit" }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  class="ml-2 mt-5"
                  color="error"
                  plain
                  @click="removeProductFromCart(item.product._id)"
                >
                  Remove From Cart
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { deleteFromCart, viewMyCart } from "@/services/users.js";
export default {
  name: "MyCart",
  data() {
    return {
      cartItems: [],
      loading: false,
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
  },
  methods: {
    async getCartItems() {
      this.cartItems = await viewMyCart();
    },
    async removeProductFromCart(id) {
      try {
        await deleteFromCart(id);
        await this.getCartItems();
      } catch (error) {
        this.error = error;
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