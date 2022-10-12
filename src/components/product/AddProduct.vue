<template>
  <!-- UnauthorisedAccess if user is not admin or superadmin -->
  <v-container fluid v-if="!(isUserLoggedIn && (isAdmin || isSuperAdmin))">
    <UnauthorisedAccess />
  </v-container>

  <!-- View For Admin or SuperAdmin -->
  <v-container fluid fill-height v-else>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 py-5 px-5" dark>
          <v-card-text>
            <!-- Form -->
            <v-form
              dark
              @submit.prevent="addProduct"
              ref="form"
              v-model="valid"
            >
              <!-- ProductName Field -->
              <v-text-field
                filled
                label="Name"
                v-model="product.name"
                :rules="[rules.required]"
              ></v-text-field>

              <!-- ProductPrice Field -->
              <v-text-field
                filled
                type="number"
                label="Price"
                v-model="product.price"
                :rules="[rules.required]"
              ></v-text-field>

              <!-- ProductCategory Field -->
              <v-select
                filled
                label="Category"
                :items="items"
                v-model="product.category"
                :rules="[rules.required]"
              ></v-select>

              <!-- ProductDescription Field -->
              <v-textarea
                filled
                row="3"
                label="Description"
                v-model="product.description"
                :rules="[rules.required]"
              ></v-textarea>

              <!-- ProductStock Field-->
              <v-text-field
                filled
                type="number"
                label="Stock"
                v-model="product.stock"
                :rules="[rules.required]"
              ></v-text-field>

              <!-- ProductImage Field -->
              <v-file-input
                filled
                chips
                prepend-icon=""
                name="productImage"
                label="Image"
                v-model="product.productImage"
                :rules="[rules.required]"
              >
              </v-file-input>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="purple" :disabled="!valid" plain>
                  Add
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Notification -->
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
import { createProduct } from "@/services/products";
export default {
  name: "AddProduct",
  components: {
    UnauthorisedAccess,
  },
  data() {
    return {
      valid: false,
      product: {
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        productImage: null,
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
    async addProduct() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }
        this.result = await createProduct(this.product);
        this.failure = false;
        this.success = true;
        setTimeout(() => {
          this.$router.push({
            name: "productDetails",
            params: {
              productId: this.result.product._id,
            },
          });
        }, 1000);
      } catch (error) {
        this.error = error;
        this.failure = true;
      }
    },
  },
};
</script>

<style>
</style>