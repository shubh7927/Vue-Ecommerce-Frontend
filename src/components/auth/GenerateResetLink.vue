<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 py-5 px-5" dark>
          <v-card-text>
            <v-form @submit.prevent="generateLink" ref="form" v-model="valid">
              <v-text-field
                v-model="email"
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

              <v-btn
                type="submit"
                color="success"
                :disabled="!valid"
                block
                depressed
                large
                rounded
              >
                Generate Link
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
export default {
  name: "GenerateResetLink",
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
        setTimeout(() => {
          this.$router.push({ name: "signin" });
        }, 2000);
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