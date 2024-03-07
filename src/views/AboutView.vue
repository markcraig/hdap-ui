<template>
  <v-card>
    <v-container style="display: flex; justify-content: center; align-items: center;">
      <img
        src="https://i.kym-cdn.com/photos/images/original/000/234/765/b7e.jpg"
        alt="I have no idea what I'm doing"
      >
    </v-container>

    <v-container class="text-h3" style="display: flex; justify-content: center; align-items: center;">TODO</v-container>

    <v-container style="display: flex; justify-content: center; align-items: center;">
    <v-list>
      <v-list-item title="Tree browser"></v-list-item>
      <v-list-item title="Advanced details view"></v-list-item>
      <v-list-item title="CRUD on any object class"></v-list-item>
      <v-list-item title="Generic error handling"></v-list-item>
      <v-list-item title="Profile page"></v-list-item>
      <v-list-item title="NameFinder"></v-list-item>
      <v-list-item title="Account mgmt (lock, unlock, etc.)"></v-list-item>
      <v-list-item title="Advanced search"></v-list-item>
    </v-list>
    </v-container>
  </v-card>
</template>

<style>
@media (min-width: 1024px) {
  #app {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
