<template>
  <!-- UnauthorisedAccess if User is already Logged in -->
  <v-container v-if="isUserLoggedIn">
    <UnauthorisedAccess />
  </v-container>

  <!-- Form If User is not logged in -->
  <v-container v-else fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 py-5 px-5" dark>
          <v-card-text>
            <!-- Form -->
            <v-form @submit.prevent="handleSignUp" ref="form" v-model="valid">
              <!-- FullName Field -->
              <v-text-field
                v-model="credentials.fullName"
                prepend-inner-icon="mdi-account"
                name="fullName"
                label="Full Name"
                type="text"
                color="primary"
                autocomplete="off"
                :rules="[rules.required]"
                outlined
                :success="rules.required(credentials.fullName) == true"
                validate-on-blur
              ></v-text-field>

              <!-- Email Field -->
              <v-text-field
                v-model="credentials.email"
                prepend-inner-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
                color="primary"
                autocomplete="off"
                :rules="[rules.required, rules.email]"
                outlined
                :success="
                  rules.required(credentials.email) == true &&
                  rules.email(credentials.email) == true
                "
                validate-on-blur
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="credentials.password"
                prepend-inner-icon="mdi-lock"
                name="password"
                label="Password"
                color="primary"
                :rules="[rules.required, rules.minLength, rules.strongPassword]"
                type="password"
                outlined
                :success="
                  rules.required(credentials.password) == true &&
                  rules.strongPassword(credentials.password) == true
                "
                validate-on-blur
              ></v-text-field>

              <!-- Confirm Password Field -->
              <v-text-field
                v-model="confirmPassword"
                prepend-inner-icon="mdi-lock"
                name="password"
                label="Confirm Password"
                color="primary"
                :type="visible ? 'text' : 'password'"
                :append-icon="!visible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="visible = !visible"
                :rules="[rules.required, rules.equalPassword]"
                :success="
                  rules.required(confirmPassword) == true &&
                  rules.equalPassword(confirmPassword) == true
                "
                outlined
              ></v-text-field>

              <!-- Profile Picture Field -->
              <v-file-input
                v-model="credentials.picture"
                prepend-icon=""
                prepend-inner-icon="mdi-camera"
                name="picture"
                label="Profile Picture"
                color="primary"
                ref="picture"
                accept="image/*"
                outlined
                :success="!!credentials.picture"
                chips
              >
              </v-file-input>

              <!-- SignUp Button -->
              <v-btn
                type="submit"
                color="purple"
                :disabled="!valid"
                block
                depressed
                large
                rounded
              >
                Sign Up
              </v-btn>

              <!-- SignIn Link -->
              <div class="grey--text text-center mt-1">
                Already have an account? Sign in
                <router-link
                  class="text-decoration-none"
                  :to="{ name: 'signin' }"
                >
                  <span> here. </span>
                </router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Notification -->
    <v-snackbar v-model="success" tile color="success">
      <v-icon left>mdi-check-circle</v-icon>
      Accont Created Successfully.
    </v-snackbar>
    <v-snackbar v-if="error" v-model="failure" tile color="error">
      <v-icon left>mdi-cancel</v-icon>
      {{ error.response.data.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { isEmail, isStrongPassword } from "validator";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
export default {
  name: "SignUp",
  components: {
    UnauthorisedAccess,
  },
  data() {
    return {
      valid: false,
      credentials: {
        fullName: "",
        email: "",
        password: "",
        picture: null,
      },
      confirmPassword: "",
      visible: false,
      rules: {
        required: (value) => !!value || "This Field Is Required.",
        email: (value) => isEmail(value) || "Invalid Email",
        strongPassword: (value) =>
          isStrongPassword(value) ||
          "Password should contain at least one lowercase, uppercase, number and symbol.",
        minLength: (value) =>
          value.length >= 8 || "Password must contain at least 8 characters",
        equalPassword: (value) =>
          value === this.credentials.password || "Password does not match",
      },
      success: false,
      failure: false,
      error: null,
    };
  },
  methods: {
    async handleSignUp() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }
        await this.$store.dispatch("signUp", this.credentials);
        this.failure = false;
        this.success = true;
        setTimeout(() => {
          this.$router.go(-1);
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