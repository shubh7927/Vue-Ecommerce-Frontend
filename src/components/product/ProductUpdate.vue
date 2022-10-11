<template>
  <v-container fluid v-if="!(isUserLoggedIn && (isAdmin || isSuperAdmin))">
    <UnauthorisedAccess />
  </v-container>
  <v-container fluid fill-height v-else-if="product">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 py-5 px-5" dark>
          <v-card-text>
            <v-form
              dark
              @submit.prevent="updateProduct"
              ref="form"
              v-model="valid"
            >
              <v-text-field
                filled
                label="Name"
                v-model="product.name"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                filled
                type="number"
                label="Price"
                v-model="product.price"
                :rules="[rules.required]"
              ></v-text-field>
              <v-select
                filled
                label="Category"
                :items="items"
                v-model="product.category"
                :rules="[rules.required]"
              ></v-select>
              <v-textarea
                filled
                row="4"
                label="Description"
                v-model="product.description"
                :rules="[rules.required]"
              ></v-textarea>
              <v-text-field
                filled
                type="number"
                label="Stock"
                v-model="product.stock"
                :rules="[rules.required]"
              ></v-text-field>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey lighten-1"
                  :disabled="!valid"
                  @click="resetForm"
                  plain
                >
                  Cancel
                </v-btn>
                <v-btn type="submit" color="success" :disabled="!valid" plain>
                  Update
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-if="result" v-model="success" tile color="success">
      <v-icon left>mdi-check-circle</v-icon>
      {{ result.message }}
    </v-snackbar>
    <v-snackbar v-if="error" v-model="failure" tile color="error">
      <v-icon left>mdi-cancel</v-icon>
      {{ error.response.data.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
import { getSingleProduct, updateSingleProduct } from "@/services/products";
export default {
  name: "ProductUpdate",
  components: {
    UnauthorisedAccess,
  },
  data() {
    return {
      valid: false,
      productId: null,
      product: {
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
      },
      items: ["Laptop", "Smartphone", "Camera", "Televison", "Accessories"],
      rules: {
        required: (value) => !!value || "This Field Is Required.",
      },
      result: null,
      success: false,
      failure: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["isUserLoggedIn", "isAdmin", "isSuperAdmin"]),
  },
  methods: {
    async updateProduct() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }
        this.result = await updateSingleProduct(this.productId, this.product);
        this.failure = false;
        this.success = true;
        setTimeout(() => {
          this.$router.push({
            name: "productDetails",
            params: {
              productId: this.productId,
            },
          });
        }, 1000);
      } catch (error) {
        this.error = error;
        this.failure = true;
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
  async mounted() {
    try {
      this.productId = this.$route.params.productId;
      const response = await getSingleProduct(this.productId, this.product);
      this.product.name = response.name;
      this.product.description = response.description;
      this.product.category = response.category;
      this.product.price = response.price;
      this.product.stock = response.stock;
    } catch (error) {
      this.error = error;
      this.failure = true;
    }
  },
};
</script>

<style>
</style>