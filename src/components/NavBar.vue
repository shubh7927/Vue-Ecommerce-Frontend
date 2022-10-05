<template>
  <nav>
    <!-- Main Nav Bar -->
    <v-app-bar app dark>
      <!-- SideNavBar Button(Small screens Only) -->
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon
          dark
          @click="sidebar = !sidebar"
        ></v-app-bar-nav-icon>
      </span>

      <!-- Navbar Title and Logo -->
      <v-toolbar-title class="text-decoration-none d-flex align-center">
        <v-img
          absolute
          height="40"
          width="40"
          class="mr-1 rounded-circle"
          src="../assets/logo.jpg"
        >
        </v-img>
        <router-link class="text-decoration-none white--text" to="/">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Navbar Links -->
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- AllProducts Link -->
        <v-btn depressed text color="purple" :to="{ name: 'allProducts' }">
          <v-icon left>mdi-store</v-icon>
          Products
        </v-btn>

        <!-- ManageAllUsers Link(SuperAdmin Only) -->
        <v-btn
          v-if="isUserLoggedIn && isSuperAdmin"
          depressed
          text
          color="purple"
          :to="{ name: 'allusers' }"
        >
          <v-icon left>mdi-account-group</v-icon>
          Manage Users
        </v-btn>

        <!-- MyCart Link(LoggedIn user only) -->
        <v-btn
          v-if="isUserLoggedIn"
          depressed
          text
          color="purple"
          :to="{ name: 'mycart' }"
        >
          <v-icon left>mdi-cart</v-icon>
          My Cart
        </v-btn>

         <!-- MyProfile Link(LoggedIn user only) -->
        <v-btn
          v-if="isUserLoggedIn"
          depressed
          text
          color="purple"
          :to="{ name: 'myProfile' }"
        >
          <v-icon left>mdi-account-circle</v-icon>
          My Profile
        </v-btn>

        <!-- SignUp Link(Logged Out User Only) -->
        <v-btn
          v-if="!isUserLoggedIn"
          depressed
          text
          color="purple"
          :to="{ name: 'signup' }"
        >
          <v-icon left>mdi-account-plus</v-icon>
          Sign Up
        </v-btn>

        <!-- SignIn Link(Logged Out User Only) -->
        <v-btn
          v-if="!isUserLoggedIn"
          depressed
          text
          color="purple"
          :to="{ name: 'signin' }"
        >
          <v-icon left>mdi-login-variant</v-icon>
          Sign in
        </v-btn>

        <!-- LogOut Link(Logged In User Only) -->
        <v-btn
          v-if="isUserLoggedIn"
          @click="handleLogOut"
          color="red"
          depressed
          dark
        >
          <v-icon left>mdi-logout-variant</v-icon>
          Log out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Side Navigation Drawer -->
    <v-navigation-drawer
      temporary
      app
      dark
      v-model="sidebar"
      class="hidden-md-and-up"
    >
      <!-- SideNavbar Title -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <router-link
              to="/"
              class="text-decoration-none text-center white--text"
            >
              {{ appTitle }}
            </router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- SideNavbar Links -->
      <v-list dense shaped>
        <!-- AllProducts Link -->
        <v-list-item color="purple" :to="{ name: 'allProducts' }">
          <v-list-item-icon>
            <v-icon color="purple">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-uppercase purple--text">
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- ManageAllUsers Link(SuperAdmin only) -->
        <v-list-item
          color="purple"
          v-if="isUserLoggedIn && isSuperAdmin"
          :to="{ name: 'allusers' }"
        >
          <v-list-item-icon>
            <v-icon color="purple">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-uppercase purple--text">
            <v-list-item-title>Manage Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- MyCart Link(LoggedIn user only) -->
        <v-list-item
          color="purple"
          v-if="isUserLoggedIn"
          :to="{ name: 'mycart' }"
        >
          <v-list-item-icon>
            <v-icon color="purple">mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-uppercase purple--text">
            <v-list-item-title>My Cart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- MyProfile Link(LoggedIn User Only) -->
        <v-list-item
          color="purple"
          v-if="isUserLoggedIn"
          :to="{ name: 'myProfile' }"
        >
          <v-list-item-icon>
            <v-icon color="purple">mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-uppercase purple--text">
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- SignUp Link(Logged Out User Only) -->
        <v-list-item
          v-if="!isUserLoggedIn"
          color="purple"
          :to="{ name: 'signup' }"
        >
          <v-list-item-icon>
            <v-icon color="purple">mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-uppercase purple--text">
            <v-list-item-title>Sign up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- SignIn Link(Logged Out User Only) -->
        <v-list-item
          v-if="!isUserLoggedIn"
          color="purple"
          :to="{ name: 'signin' }"
        >
          <v-list-item-icon>
            <v-icon color="purple">mdi-login-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-uppercase purple--text">
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- LogOut Link(Logged In User Only) -->
      <template v-if="isUserLoggedIn" v-slot:append>
        <div class="pa-2">
          <v-btn @click="handleLogOut" color="error" block>
            Logout
            <v-icon right>mdi-logout-variant</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      sidebar: false,
      appTitle: "GadgetMaster",
      error: null,
    };
  },
  computed: {
    ...mapGetters(["isUserLoggedIn", "isAdmin", "isSuperAdmin"]),
  },
  methods: {
    async handleLogOut() {
      try {
        await this.$store.dispatch("logOut");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style>
</style>