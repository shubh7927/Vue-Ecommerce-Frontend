<template>
  <v-footer dark padless>
    <v-card flat tile class="text-center py-5">
      <v-card-text>
        <v-btn
          v-for="link in links"
          :href="link.address"
          target="_blank"
          :key="link.address"
          class="mx-4"
          dark
          icon
          color="purple"
        >
          <v-icon size="24px" color="purple">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="pt-0">
        Fynd Academy is an accelerated learning program for freshers and
        experienced professionals to build their skills and meaningfully
        contribute at work from Day One. Fynd Academy sets up its students on a
        lifelong growth path. Learn what our Trainees dream and work towards,
        and prepare to start your programming career with the best.
      </v-card-text>

      <v-card-text>
        <v-icon small>mdi-copyright</v-icon>
        {{ new Date().getFullYear() }} — <strong>Fynd Academy</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "PageFooter",
  data() {
    return {
      links: [
        {
          icon: "mdi-instagram",
          address: "https://www.instagram.com/p/Ch1SNfPgX9W/",
        },
        {
          icon: "mdi-twitter",
          address: "https://twitter.com/AcademyFynd",
        },
        {
          icon: "mdi-linkedin",
          address: "https://www.linkedin.com/showcase/82146162/",
        },
      ],
    };
  },
};
</script>

<style>
</style>