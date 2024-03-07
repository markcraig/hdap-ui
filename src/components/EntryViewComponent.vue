<script setup>
import {useRoute} from 'vue-router'
import {ref} from "vue";
import {useAuthStateStore} from '@/stores/state'
import { JsonForms } from '@jsonforms/vue';
import { vuetifyRenderers } from '@jsonforms/vue-vuetify';

const renderers = [
  ...vuetifyRenderers,
  // here you can add custom renderers
];
const frozenRenderers = Object.freeze(renderers)

let dn = useRoute().params.dn
const entry = ref({})
const schema = ref({})
const objectClass = ref({})
const authState = useAuthStateStore()
const request = authState.addAuthzHeader(new Request("/hdap/" + dn, {method: "GET"}))
const schemaRequest = authState.addAuthzHeader(new Request("/hdap/" + dn + "?_action=schema", {method: "POST"}))
const uischema = ref(null)

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

function onChange(event) {
  entry.value = event.data;
}

fetch(request)
    .then((r) => r.json())
    .then((j) => {
      entry.value = j
      objectClass.value = resolveObjectClass(j.objectClass)
    })


fetch(schemaRequest)
    .then((r) => r.json())
    .then((j) => schema.value = j)
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
    <json-forms
        :data="entry"
        :schema="schema"
        :uischema="uischema"
        :renderers="frozenRenderers"
        @change="onChange"
    />
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
    <json-forms
        :data="entry"
        :schema="schema"
        :uischema="uischema"
        :renderers="frozenRenderers"
        @change="onChange"
    />
    <p>{{ entry }}</p>
  </div>
</template>

<style>
/* @import '~@jsonforms/vue-vuetify/lib/jsonforms-vue-vuetify.esm.css'; */

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
