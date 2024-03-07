<script setup>
import {useRoute} from 'vue-router'
import {ref} from "vue";

let dn = useRoute().params.dn
const entry = ref({})

fetch(new Request("/hdap/" + dn, {method: "GET"}))
    .then((r) => r.json())
    .then((j) => entry.value = j )
</script>

<template>
  <div class="view">
    <h1 class="green">Entry View</h1>
    <p>{{ entry }}</p>
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
