<template>
  <div>
    <v-container style="height: 100vh" v-if="loading">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="productDetail">
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
      <v-row class="my-4" v-if="isUserLoggedIn && (isAdmin || isSuperAdmin)">
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
            <v-card-title class="text-h5"> Are You Sure? </v-card-title>
            <v-card-text>
              Press Ok to delete {{ productDetail.product.name }} or Cancel if
              it was a mistake.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey lighten-1" text @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn color="red darken-1" text @click="deleteProduct">
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        {{ productDetail }}
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingleProduct, deleteProductById } from "@/services/products.js";
export default {
  name: "ProductDetails",
  data() {
    return {
      productId: null,
      productDetail: null,
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
  },
  async mounted() {
    this.loading = true;
    this.productId = this.$route.params.productId;
    try {
      this.productDetail = await getSingleProduct(this.productId);
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