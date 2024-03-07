<script setup>
import {useRoute} from 'vue-router'
import {ref} from "vue";
import {useAuthStateStore} from '@/stores/state'

let dn = useRoute().params.dn
const entry = ref({})
const objectClass = ref({})
const authState = useAuthStateStore()
const request = authState.addAuthzHeader(new Request("/hdap/" + dn, {method: "GET"}))

function resolveObjectClass(objectClasses) {
  for (const oc of objectClasses) {
    switch (oc.toLowerCase()) {
      case "person":
      case "groupofnames":
      case "groupofuniquenames":
        return oc
    }
    return "unknown"
  }
}

fetch(request)
    .then((r) => r.json())
    .then((j) => {
      entry.value = j
      objectClass.value = resolveObjectClass(j.objectClass)
    })
</script>

<template>
  <div class="view" v-if="objectClass === 'person'">
    <h1 class="green">Viewing {{ entry.cn[0] }}</h1>
    <v-form readonly>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="entry.givenName" label="First name"/>
          </v-col>
          <v-col>
            <v-text-field v-model="entry.sn" label="Last name"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="entry.mail" label="E-mail"/>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
  <div class="view" v-if="objectClass === 'groupOfUniqueNames'">
    <h1 class="green">Viewing group {{ entry.cn[0] }}</h1>
    <v-table>
      <tbody>
      <tr v-for="item in entry.uniqueMember">
        <td><a v-bind:href="`/view/${item}`">{{ item }}</a></td>
      </tr>
      </tbody>
    </v-table>
  </div>
  <div class="view" v-if="objectClass === 'groupOfNames'">
    <h1 class="green">Viewing group {{ entry.cn[0] }}</h1>
    <v-table>
      <tbody>
      <tr v-for="item in entry.member">
        <td><a v-bind:href="`/view/${item}`">{{ item }}</a></td>
      </tr>
      </tbody>
    </v-table>
  </div>
  <div class="view" v-if="objectClass === 'unknown'">
    <h1 class="green">Viewing {{ dn }}</h1>
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
