<template>
  <!-- UnauthorisedAccess for Normal users and Admin -->
  <v-container v-if="!isUserLoggedIn">
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

  <!-- No order found -->
  <v-container class="fill-height" v-else-if="allOrders.length == 0">
    <v-row align="center" class="flex-column"> No Orders Placed </v-row>
  </v-container>

  <!-- AllOrders -->
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

    <!-- OrderCards -->
    <v-row justify="center">
      <v-col
        v-for="order in allOrders"
        :key="order.product_id"
        class="col-12 col-sm-7"
      >
        <v-card dark>
          <!-- Order Details -->
          <div class="d-flex flex-no-wrap">
            <!-- Ordered Item Image -->
            <v-avatar class="ma-3" size="120" tile>
              <v-img :src="order.product.image.url"></v-img>
            </v-avatar>
            <div>
              <!-- Ordered Item Name -->
              <v-card-title class="text-sm-h5 mb-0 pb-0">
                {{ order.product.name }}
              </v-card-title>

              <!-- Ordered Item Price -->
              <v-card-subtitle class="my-0 py-0">
                ₹ {{ order.product.price.toLocaleString() }}
              </v-card-subtitle>

              <!-- Ordered Item quantity -->
              <v-card-subtitle class="py-0 my-0">
                {{ order.quantity }} {{ order.quantity > 1 ? "Units" : "Unit" }}
              </v-card-subtitle>

              <!-- User(Ordered By) Email -->
              <v-card-subtitle class="py-0 my-0">
                Ordered by: {{ order.orderedBy.email }}
              </v-card-subtitle>

              <!-- Order Date -->
              <v-card-subtitle class="py-0 my-0 grey--text">
                Ordered On: {{ formatDate(order.createdAt) }}
              </v-card-subtitle>
            </div>
          </div>
          <v-divider></v-divider>

          <!-- Order Status and Update Status Button  -->
          <div class="pa-2 d-flex align-center">
            Order Status:
            <span
              :class="{
                'pl-1': true,
                'blue--text': order.status === 'Pending',
                'orange--text': order.status === 'Shipped',
                'green--text': order.status === 'Delivered',
              }"
            >
              {{ order.status }}
            </span>
            <v-spacer></v-spacer>
            <v-btn
              v-if="order.status === 'Pending'"
              color="purple"
              text
              @click="updateStatus('Shipped', order.orderId, order.product._id)"
            >
              Mark Shipped
            </v-btn>
            <v-btn
              v-if="order.status === 'Shipped'"
              color="purple"
              text
              @click="
                updateStatus('Delivered', order.orderId, order.product._id)
              "
            >
              Mark Delivered
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { getAllOrders, setOrderStatus } from "@/services/orders";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
export default {
  name: "AllOrders",
  components: {
    UnauthorisedAccess,
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"]),
  },
  data() {
    return {
      allOrders: [],
      loading: false,
      success: false,
      failure: false,
      result: null,
      error: null,
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "MMM dd, yyyy");
    },
    async getAllOrders() {
      const tempArr = [];
      const response = await getAllOrders();
      response.orders.forEach((order) => {
        order.orderItems.forEach((item) => {
          const orderItem = {
            product: item.product,
            orderedBy: order.orderedBy,
            status: item.status,
            createdAt: order.createdAt,
            quantity: item.quantity,
            orderId: order._id,
          };
          tempArr.push(orderItem);
          this.allOrders = [...tempArr];
        });
      });
    },
    async updateStatus(newStatus, orderId, productId) {
      try {
        this.result = await setOrderStatus(newStatus, orderId, productId);
        await this.getAllOrders();
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
      await this.getAllOrders();
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