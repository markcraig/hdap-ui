<script setup>
import { ref } from 'vue'
import axios from "axios"
import {useRouter} from "vue-router";

const baseDN = 'dc=com/dc=example/ou=people'
const crumbs = baseDN.split('/')

const uid = ref('')

const headers = [
//  { title: 'DN', key: '_id' },
  { title: 'Name', key: 'cn' },
  { title: 'Actions', key: 'actions', sortable: false }
]
var results = ref([
])

async function searchForUid() {
  if (!uid.value) {
    return
  }
  console.log(`In searchForUid for ${uid.value}`)
  try {
    let res = await axios.get('/hdap/dc=com/dc=example', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('uid=admin:password')}`
      },
      params: {
        _queryFilter: `uid co '${uid.value}'`,
        scope: 'sub',
        _fields: "cn,_id"
      }
    })
    let sr = await res.data.result
    console.log(`search results are ${JSON.stringify(sr)}`)
    results.value = []
    for (let result of sr) {
      results.value.push({ _id: result._id, cn: result.cn[0] })
    }
    console.log(`Converted ${sr.length} -> ${results.value.length}`)
    console.log(`The final results are ${JSON.stringify(results.value)}`)
  } catch (error) {
    console.error(error)
  }
}

function editEntry(router, item) {
  console.log(`Editing entry ${item._id}`)
  console.log(`Router is ${router}`)
  router.push({ path: '/view', replace: true, params: { dn: item._id } })
}

function deleteEntry(router, item) {
  console.log(`Deleting entry ${item._id}`)
}

</script>
<template>
  <v-sheet>
  <v-breadcrumbs :items="crumbs"></v-breadcrumbs>
  <v-text-field label="Search"
                v-model="uid"
                placeholder="user id"
                prepend-inner-icon="search"
                @keydown.enter="searchForUid">
  </v-text-field>
  <v-data-table
                :headers="headers"
                :items="results"
                :items-per-page="5"
                hide-actions
                first-icon="$first"
                prev-icon="$prev"
                next-icon="$next"
                last-icon="$last"
                class="elevation-1">
    <template v-slot:item.cn="{ item }">
      <span @click.stop="viewEntry">{{ item.cn }}</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editEntry($router, item)">mdi-pencil</v-icon>
      <v-icon
        class="me-2"
        size="small"
        @click="deleteEntry($router, item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
  </v-sheet>
</template>
