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
            <v-form @submit.prevent="resetPassword" ref="form" v-model="valid">

              <!-- New Password Field -->
              <v-text-field
                v-model="credentials.password"
                prepend-inner-icon="mdi-lock"
                name="password"
                label="New Password"
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
                v-model="credentials.confirmPassword"
                prepend-inner-icon="mdi-lock"
                name="password"
                label="Confirm New Password"
                color="primary"
                :type="visible ? 'text' : 'password'"
                :append-icon="!visible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="visible = !visible"
                :rules="[rules.required, rules.equalPassword]"
                :success="
                  rules.required(credentials.confirmPassword) == true &&
                  rules.equalPassword(credentials.confirmPassword) == true
                "
                outlined
              ></v-text-field>

              <!-- Reset Password Button -->
              <v-btn
                type="submit"
                color="purple"
                :disabled="!valid"
                block
                depressed
                large
                rounded
              >
                Reset Password
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Notification -->
    <v-snackbar v-model="success" tile color="success">
      <v-icon left>mdi-check-circle</v-icon>
      Password Updated Successfully.
    </v-snackbar>
    <v-snackbar v-if="error" v-model="failure" tile color="error">
      <v-icon left>mdi-cancel</v-icon>
      {{ error.response.data.message }}
    </v-snackbar>
    
  </v-container>
</template>

<script>
import { isStrongPassword } from "validator";
import { resetUserPassword } from "@/services/auth";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
export default {
  name: "ResetPassword",
  components: {
    UnauthorisedAccess,
  },
  data() {
    return {
      valid: false,
      token: this.$route.params.token,
      credentials: { password: "", confirmPassword: "" },
      visible: false,
      rules: {
        required: (value) => !!value || "This Field Is Required.",
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
    async resetPassword() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }
        await resetUserPassword(this.token, this.credentials);
        this.failure = false;
        this.success = true;
        setTimeout(() => {
          this.$router.push({
            name: "signin",
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