<template>
  <main>
    <!-- Hero Section -->
    <v-img absolute dark height="600" src="../assets/gadgets.jpg">
      <div class="heroText">
        <div>
          <h1>Best Brands. Best Deals</h1>
          <p>Hot Brands with upto 40% discount</p>
          <p>What Are you Waiting For? Place your order Now.</p>
          <v-btn depressed color="purple" :to="{ name: 'allProducts' }">
            Order Now
          </v-btn>
        </div>
      </div>
    </v-img>

    <!-- Product Section -->
    <section class="productSection">
      <h2 class="sectionHeading">Our Products</h2>
      <v-container v-if="products.length > 0">
        <v-row>
          <v-col v-for="product in products" :key="product._id">
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
        <v-row>
          <v-spacer></v-spacer>
          <v-btn text color="purple" :to="{ name: 'allProducts' }">
            View all
            <v-icon right> mdi-arrow-right </v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </section>

    <!-- Customer Review Section -->
    <section class="reviewSection">
      <h1 class="sectionHeading">Customer's Review</h1>
      <v-container>
        <v-timeline dark>
          <v-timeline-item dark v-for="(review, i) in reviews" :key="i">
            <template v-slot:icon>
              <v-avatar>
                <img :src="review.img" />
              </v-avatar>
            </template>
            <template>
              <span>{{ review.customerName }}</span>
            </template>
            <v-card class="elevation-2">
              <v-card-text> {{ review.feedback }} </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </section>

    <!-- CTA Section -->
    <v-container
      fluid
      class="ctaSection d-flex flex-column align-center py-10 purple mt-5"
    >
      <h2 class="sectionHeading py-0 my-0">Want a new Gadget?</h2>
      <p class="pt-0 mt-0">
        Hurry up!!! Place your order before you miss the deal.
      </p>
      <v-btn depressed outlined color="white" :to="{ name: 'allProducts' }">
        Order Now
      </v-btn>
    </v-container>

    <PageFooter />
  </main>
</template> 

<script>
import { getProductsList } from "@/services/products.js";
import ProductCard from "@/components/product/ProductCard.vue";
import PageFooter from "@/components/PageFooter.vue";

export default {
  name: "HomePage",
  components: {
    ProductCard,
    PageFooter,
  },
  data() {
    return {
      products: [],
      reviews: [
        {
          customerName: "Dumbledore",
          img: require("../assets/male1.png"),
          feedback:
            "Lorem ipsum dolor sit amet consectetur, libero tenetur excepturi non ullam .",
        },
        {
          customerName: "McGonical",
          img: require("../assets/female1.png"),
          feedback:
            "Lorem ipsum dolor sit amet consectetur adipisicing perferendis alias, tempore ipsa ducimus magnam architecto.",
        },
        {
          customerName: "Snape",
          img: require("../assets/male2.png"),
          feedback:
            "Lorem ipsum dolor sit amet consectetur  totam perferendis alias, tempore ipsa ducimus magnam architecto.",
        },
        {
          customerName: "Hermione",
          img: require("../assets/female2.png"),
          feedback:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil autem, earum, libero teneturs magnam architecto.",
        },
      ],
    };
  },
  async mounted() {
    const response = await getProductsList({});
    this.products = response.allProducts.slice(0, 3);
  },
};
</script>

<style scoped>
.heroText {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.heroText > div {
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
}
.heroText > div > h1 {
  margin-bottom: 10px;
  font-size: 40px;
  font-family: "Lobster", cursive;
}
.heroText > div > p,
.ctaSection > p {
  line-height: 20px;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
}
</style>