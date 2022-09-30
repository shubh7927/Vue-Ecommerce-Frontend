<template>
  <!-- <v-row fill-height align="center" justify="center">
   <v-col>
     <v-img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" height="400" width="700"></v-img>
   </v-col>
  </v-row> -->
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md8>
        <v-img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          height="400"
        >
        </v-img>
        <v-row justify="center" align="center" class="d-flex flex-column my-5">
          <h1>401</h1>
          <h3>The Page You are looking for needs permission.</h3>
          <h3>And It seems you do not have permission.</h3>

          <v-btn class="my-3" color="purple" :to="{ name: 'home' }" plain>
            Go back to home
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "UnauthorisedAccess",
};
</script>

<style scoped>
</style>