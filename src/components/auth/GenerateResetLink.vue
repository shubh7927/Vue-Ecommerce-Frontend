<template>
  <!-- UnauthorisedAccess if User is already Logged in -->
  <v-container v-if="isUserLoggedIn">
    <UnauthorisedAccess />
  </v-container>

  <!-- Form If User is not logged in -->
  <v-container v-else fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 py-5 px-5 text-center" dark>
          <v-card-text class="text-h5 white--text">
            Confirm Your Email
          </v-card-text>
          <v-card-text>
            <!-- Form -->
            <v-form @submit.prevent="generateLink" ref="form" v-model="valid">
              <!-- Email Field -->
              <v-text-field
                v-model="email"
                prepend-inner-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
                color="primary"
                autocomplete="off"
                :success="rules.email(email) == true"
                :rules="[rules.required, rules.email]"
                outlined
              ></v-text-field>

              <!-- Generate Resest Password Link -->
              <v-btn
                type="submit"
                color="purple"
                :disabled="!valid"
                block
                depressed
                large
                rounded
              >
                Get Reset Password Link
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Notification -->
    <v-snackbar v-model="success" tile color="success">
      <v-icon left>mdi-check-circle</v-icon>
      Email sent to {{ email }}
    </v-snackbar>
    <v-snackbar v-if="error" v-model="failure" tile color="error">
      <v-icon left>mdi-cancel</v-icon>
      {{ error.response.data.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { isEmail } from "validator";
import { generateResetPasswordLink } from "@/services/auth";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
export default {
  name: "GenerateResetLink",
  components: {
    UnauthorisedAccess,
  },
  data() {
    return {
      valid: true,
      email: "",
      rules: {
        required: (value) => !!value || "This Field Is Required",
        email: (value) => {
          return isEmail(value) || "Invalid Email";
        },
      },
      success: false,
      failure: false,
      error: null,
    };
  },
  methods: {
    async generateLink() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }

        await generateResetPasswordLink(this.email);
        this.failure = false;
        this.success = true;
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