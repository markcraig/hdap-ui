<script setup>
import { RouterView } from 'vue-router'
import LoginDialog from './views/LoginDialog.vue';

function logout() {
  localStorage.removeItem('token')
}

</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="HDAP Demo App">
      <LoginDialog />
    </v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <v-list-item :to="{ path: '/search' }" title="Search"></v-list-item>
        <v-list-item :to="{ path: '/' }" title="About"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
