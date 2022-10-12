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

  <!-- Zero Orders message -->
  <v-container class="fill-height" v-else-if="orderItems.length == 0">
    <v-row align="center" class="flex-column">
      You don't have any orders for Now.
      <v-btn color="purple" :to="{ name: 'allProducts' }" plain>
        Find Items Here
      </v-btn>
    </v-row>
    <v-row justify="center"> </v-row>
  </v-container>

  <!-- All Orders -->
  <v-container v-else>
    <v-row class="my-3"> </v-row>

    <!-- All Orders Cards -->
    <v-row justify="center">
      <v-col
        v-for="item in orderItems"
        :key="item.product_id"
        class="col-12 col-sm-7"
      >
        <v-card dark>
          <div class="d-flex flex-no-wrap">
            <!-- Ordered Item Image -->
            <v-avatar class="ma-3" size="120" tile>
              <v-img :src="item.product.image.url"></v-img>
            </v-avatar>
            <div>
              <!-- Ordered Item Name -->
              <v-card-title class="text-sm-h5 mb-0 pb-0">
                {{ item.product.name }}
              </v-card-title>

              <!-- Ordered Item Price -->
              <v-card-subtitle class="my-0 py-0">
                ₹ {{ item.product.price.toLocaleString() }}
              </v-card-subtitle>

              <!-- Ordered Item Quantity -->
              <v-card-subtitle class="py-0 my-0">
                {{ item.quantity }} {{ item.quantity > 1 ? "Units" : "Unit" }}
              </v-card-subtitle>

              <!-- Order date -->
              <v-card-subtitle class="py-0 my-0 grey--text">
                Ordered On: {{ item.createdAt }}
              </v-card-subtitle>
            </div>
          </div>
          <v-divider></v-divider>

          <!-- Order Status -->
          <div class="pa-2">
            Order Status:
            <span
              :class="{
                'blue--text': item.status === 'Pending',
                'orange--text': item.status === 'Shipped',
                'green--text': item.status === 'Delivered',
              }"
            >
              {{ item.status }}
            </span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { viewMyOrders } from "@/services/orders.js";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
export default {
  name: "MyOrders",
  components: {
    UnauthorisedAccess,
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"]),
  },
  data() {
    return {
      orderItems: [],
      loading: false,
      error: null,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const response = await viewMyOrders();
      response.orders.forEach((order) => {
        order.orderItems.forEach((orderItem) => {
          let obj = {
            product: orderItem.product,
            quantity: orderItem.quantity,
            createdAt: order.createdAt,
            status: orderItem.status,
          };
          this.orderItems.push(obj);
        });
      });
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