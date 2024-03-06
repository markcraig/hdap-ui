<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
  </header>

  <v-layout class="rounded rounded-md">
      <v-app-bar title="HDAP Demo App"></v-app-bar>

      <v-navigation-drawer>
        <v-list>
          <v-list-item :to="{path: '/'}" title="Home"></v-list-item>
        </v-list>
        <v-list>
          <v-list-item :to="{path: '/about'}" title="About"></v-list-item>
        </v-list>
        <v-list>
          <v-list-item :to="{path: '/login'}" title="Login"></v-list-item>
        </v-list>
        <v-list>
          <v-list-item :to="{path: '/view'}" title="View"></v-list-item>
        </v-list>
        <v-list>
          <v-list-item :to="{path: '/search'}" title="Search"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <RouterView />
      </v-main>
    </v-layout>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
