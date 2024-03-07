<script setup>
import { RouterView } from 'vue-router'

function logout() {
  localStorage.removeItem('token')
}

</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="HDAP Demo App"></v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <v-list-item :to="{ path: '/' }" title="About"></v-list-item>
        <v-list-item :to="{ path: '/login' }" title="Login"></v-list-item>
        <v-list-item :to="{ path: '/search' }" title="Search"></v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>

  </v-layout>
</template>
