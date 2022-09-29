<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 py-5 px-5" dark>
          <v-card-text class="blue--text text--blue">
            <v-form @submit.prevent="handleSignIn" ref="form" v-model="valid">
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
                validate-on-blur
              ></v-text-field>

              <v-text-field
                v-model="credentials.password"
                prepend-inner-icon="mdi-lock"
                name="password"
                label="Password"
                color="primary"
                :type="visible ? 'text' : 'password'"
                :append-icon="!visible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="visible = !visible"
                :rules="[rules.required, rules.minLength]"
                outlined
              ></v-text-field>
              <v-btn
                type="submit"
                color="success"
                :disabled="!valid"
                block
                depressed
                large
                rounded
              >
                Sign In
              </v-btn>
              <div class="grey--text text-center mt-1">
                <router-link
                  class="text-decoration-none"
                  :to="{ name: 'generatelink' }"
                >
                  Forgot Your Password?
                </router-link>
              </div>
              <div class="grey--text text-center mt-1 text--darken-5"> OR </div>
              <div class="grey--text text-center mt-1">
                Don't have an account? Create Your account
                <router-link
                  class="text-decoration-none"
                  :to="{ name: 'signup' }"
                >
                  <span> here. </span>
                </router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="success" tile color="success">
      <v-icon left>mdi-check-circle</v-icon>
      Logged In Successfully.
    </v-snackbar>
    <v-snackbar v-if="error" v-model="failure" tile color="error">
      <v-icon left>mdi-cancel</v-icon>
      {{ error.response.data.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { isEmail } from "validator";
export default {
  name: "SignIn",
  data() {
    return {
      visible: false,
      valid: true,
      credentials: {
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "This Field Is Required",
        email: (value) => {
          return isEmail(value) || "Invalid Email";
        },
        minLength: (value) =>
          value.length >= 8 || "Password must contain at least 8 characters",
      },
      success: false,
      failure: false,
      error: null,
    };
  },
  methods: {
    async handleSignIn() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }

        await this.$store.dispatch("signIn", this.credentials);
        this.failure = false;
        this.success = true;
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 2000);
      } catch (error) {
        this.error = error;
        this.failure = true;
      }
    },
  },
};
</script>

<style scoped>

</style>