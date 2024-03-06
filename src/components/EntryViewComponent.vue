<script setup>
import {ref} from 'vue'

const dn = ref('dc=com/dc=example')
const entry = ref({})
const schema = ref({})

async function getEntry() {
  entry.value = await fetchResource("/hdap/" + dn.value, "GET")
  schema.value = await fetchResource("/hdap/" + dn.value + "?_action=schema", "POST")
}

async function fetchResource(path, getOrPost) {
  const request = new Request(path, {method: getOrPost});
  const response = await fetch(request);
  return await response.json();
}
</script>

<template>
  <div class="view">
    <h1 class="green">Entry View</h1>
    <input v-model="dn" placeholder="Entry" type="text">
    <button class="green" @click="getEntry">GET</button>
    <p>{{ entry }}</p>
    <p>{{ schema }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .view {
    display: inline;
    align-items: center;
  }

  button {
    float: right;
  }
}
</style>
