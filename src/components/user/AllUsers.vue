<template>
  <!-- UnauthorisedAccess for all Users Except SuperAdmin -->
  <v-container v-if="!(isUserLoggedIn && isSuperAdmin)">
    <UnauthorisedAccess />
  </v-container>

  <!-- Error Message -->
  <v-container v-else-if="error" class="text-h5">
    {{ error.response.data }}
  </v-container>

  <!-- SuperAdmin View -->
  <v-container v-else class="my-5">
    <!-- Skeleton Loaders -->
    <v-row v-if="loading">
      <v-col v-for="n in 3" :key="n">
        <v-skeleton-loader
          dark
          v-bind="attrs"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- All Users Cards -->
    <v-row v-if="allUsers.length > 0">
      <v-col v-for="user in allUsers" :key="user._id">
        <v-card dark class="mx-auto" max-width="300">
          <!-- User Profile Pic -->
          <v-card-title class="pb-0">
            <v-avatar size="50" color="purple">
              <img
                v-if="user.profilePic"
                :src="user.profilePic.url"
                alt="alt"
              />
              <span v-else>{{ user.fullName[0] }}</span>
            </v-avatar>
          </v-card-title>

          <!-- User FullName with access badge -->
          <v-card-title class="pt-1 text-capitalize">
            {{ user.fullName }}
            <span
              :class="{
                userAccess: true,
                'text-uppercase': true,
                user: user.access === 'user',
                admin: user.access === 'admin',
              }"
            >
              {{ user.access }}
            </span>
          </v-card-title>

          <!-- User Email -->
          <v-card-subtitle class="pb-0 white--text">
            {{ user.email }}
          </v-card-subtitle>

          <!-- User Joined date -->
          <v-card-text class="pb-0 grey--text">
            Joined On {{ formatDate(user.joinedOn) }}
          </v-card-text>

          <!-- UpdateUserAccess and DeleteUser Button -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              plain
              v-if="user.access === 'user'"
              color="purple"
              @click="promoteToAdmin(user._id)"
            >
              Promote to admin
            </v-btn>
            <v-btn
              plain
              v-if="user.access === 'admin'"
              color="purple"
              @click="demoteToUser(user._id)"
            >
              Demote to user
            </v-btn>
            <v-btn plain color="error" @click="deleteUser(user._id)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format } from "date-fns";
import { mapGetters } from "vuex";
import UnauthorisedAccess from "@/components/UnauthorisedAccess.vue";
import {
  getAllUsers,
  deleteSingleUser,
  updateUserAccess,
} from "@/services/users.js";
export default {
  name: "AllUsers",
  components: {
    UnauthorisedAccess,
  },
  data() {
    return {
      allUsers: [],
      error: null,
      loading: false,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  computed: {
    ...mapGetters(["isUserLoggedIn", "isSuperAdmin"]),
  },
  methods: {
    async getUsersList() {
      const response = await getAllUsers();
      this.allUsers = response.users.filter(
        (user) => user.access !== "superadmin"
      );
    },
    formatDate(date) {
      return format(new Date(date), "MMM dd, yyyy");
    },
    async deleteUser(userId) {
      try {
        await deleteSingleUser(userId);
        await this.getUsersList();
      } catch (error) {
        this.error = error;
      }
    },
    async promoteToAdmin(userId) {
      try {
        await updateUserAccess(userId, { access: "admin" });
        await this.getUsersList();
      } catch (error) {
        this.error = error;
      }
    },
    async demoteToUser(userId) {
      try {
        await updateUserAccess(userId, { access: "user" });
        await this.getUsersList();
      } catch (error) {
        this.error = error;
      }
    },
  },
  async mounted() {
    try {
      this.loading = true;
      await this.getUsersList();
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.userAccess {
  color: Red;
  font-size: 12px;
  margin: 2px 0 0 15px;
  border: 1px solid red;
  padding: 2px 5px;
  line-height: 12px;
  letter-spacing: 1px;
}
.userAccess.admin {
  color: green;
  border: 1px solid green;
}
.userAccess.user {
  color: rgb(33, 145, 234);
  border: 1px solid rgb(33, 145, 234);
}
</style>