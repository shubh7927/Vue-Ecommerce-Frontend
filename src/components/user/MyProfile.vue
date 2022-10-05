<template>
  <v-container v-if="!isUserLoggedIn">
    <UnauthorisedAccess />
  </v-container>
  <v-container class="fill-height" v-else-if="loading">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="4">
        <v-progress-linear
          color="purple"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid fill-height v-else>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-5 py-3 px-1 px-sm-5" dark>
          <v-row justify="center" class="my-2">
            <v-avatar size="80" color="purple">
              <template v-if="profileData.profilePic != null">
                <img :src="profileData.profilePic.url" alt="profilePic" />
              </template>
              <span v-else class="text-h4">
                {{ profileData.fullName[0] }}
              </span>
            </v-avatar>
          </v-row>

          <v-card-text class="py-0 text-h4 white--text">
            {{ profileData.fullName }}
          </v-card-text>
          <v-card-text class="py-0 text-subtitle-1 white--text">
            {{ profileData.email }}
          </v-card-text>
          <v-card-text class="py-2 text-subtitle-2">
            Joined On {{ formatDate(profileData.joinedOn) }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { format } from "date-fns";
import { mapGetters } from "vuex";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
import { viewProfile } from "@/services/users";
export default {
  name: "MyProfile",
  components: {
    UnauthorisedAccess,
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"]),
  },
  data() {
    return {
      loading: false,
      profileData: null,
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "MMM dd, yyyy");
    },
  },
  async mounted() {
    this.profileData = await viewProfile();
  },
};
</script>

<style>
</style>