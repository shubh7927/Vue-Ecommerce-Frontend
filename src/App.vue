<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",

  components: {
    NavBar,
  },
};
</script>
<style>
main {
  background: rgb(39, 39, 39);
  color: white;
}
.sectionHeading {
  font-family: "Lobster", cursive;
  font-size: 40px;
  text-align: center;
  margin: 20px 0;
}
</style>
