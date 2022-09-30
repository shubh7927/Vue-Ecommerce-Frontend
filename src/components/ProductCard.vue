<template>
  <v-card dark class="mx-auto" max-width="300">
    <v-img height="300px" :src="imgLink"> </v-img>

    <v-card-title>{{ name }}</v-card-title>

    <v-card-subtitle class="pb-0"> ₹{{ price }} </v-card-subtitle>
    <v-rating
      dense
      half-increments
      readonly
      :value="rating"
      color="warning"
      background-color="warning"
      class="ml-2 mt-0"
    >
    </v-rating>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        plain
        color="purple"
        :to="{ name: 'productDetails', params: { productId: productId } }"
      >
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template> 

<script>
export default {
  name: "ProductCard",
  props: ["price", "name", "category", "productId", "imgLink", "rating"],
};
</script>

<style>
</style>