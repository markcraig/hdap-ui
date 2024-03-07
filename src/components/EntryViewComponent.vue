<script setup>
import {useRoute} from 'vue-router'
import {ref} from "vue";
import { useAuthStateStore } from '@/stores/state'

let dn = useRoute().params.dn
const entry = ref({})
const authState = useAuthStateStore()
const request = authState.addAuthzHeader(new Request("/hdap/" + dn, {method: "GET"}))

fetch(request)
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
