<script setup>
import {useRoute} from 'vue-router'
import {ref} from "vue";
import {useAuthStateStore} from '@/stores/state'
import {JsonForms} from '@jsonforms/vue';
import {vuetifyRenderers} from '@jsonforms/vue-vuetify';

const renderers = [
  ...vuetifyRenderers,
  // here you can add custom renderers
];
const frozenRenderers = Object.freeze(renderers)
const authState = useAuthStateStore()
const uischema = ref(null)

// Fetch the entry and its schema, making sure to set everything atomically on completion
// in order to avoid attempting to render the entry without schema.
const content = ref({})
let dn = useRoute().params.dn
const entryRequest = authState.addAuthzHeader(new Request("/hdap/" + dn, {method: "GET"}))
const schemaRequest = authState.addAuthzHeader(new Request("/hdap/" + dn + "?_action=schema", {method: "POST"}))
const schema = ref({})
fetch(schemaRequest)
    .then((r) => r.json())
    .then((j) => schema.value = j)
    .then((_) => fetch(entryRequest))
    .then((r) => r.json())
    .then((j) => {
      content.value = {
        schema: schema.value,
        objectClass: resolveObjectClass(j.objectClass),
        entry: j
      }
    })

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
  content.value.entry = event.data;
}
</script>

<template>
  <div class="view" v-if="content.objectClass === 'person'">
    <h1 class="green">Viewing {{ content.entry.cn[0] }}</h1>
    <v-form readonly>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="content.entry.givenName" label="First name"/>
          </v-col>
          <v-col>
            <v-text-field v-model="content.entry.sn" label="Last name"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="content.entry.mail" label="E-mail"/>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <json-forms
        :data="content.entry"
        :schema="content.schema"
        :uischema="uischema"
        :renderers="frozenRenderers"
        @change="onChange"
    />
  </div>
  <div class="view" v-if="content.objectClass === 'groupOfUniqueNames'">
    <h1 class="green">Viewing group {{ content.entry.cn[0] }}</h1>
    <v-table>
      <tbody>
      <tr v-for="item in content.entry.uniqueMember">
        <td><a v-bind:href="`/view/${item}`">{{ item }}</a></td>
      </tr>
      </tbody>
    </v-table>
  </div>
  <div class="view" v-if="content.objectClass === 'groupOfNames'">
    <h1 class="green">Viewing group {{ content.entry.cn[0] }}</h1>
    <v-table>
      <tbody>
      <tr v-for="item in content.entry.member">
        <td><a v-bind:href="`/view/${item}`">{{ item }}</a></td>
      </tr>
      </tbody>
    </v-table>
  </div>
  <div class="view" v-if="content.objectClass === 'unknown'">
    <h1 class="green">Viewing {{ dn }}</h1>
    <json-forms
        :data="content.entry"
        :schema="content.schema"
        :uischema="uischema"
        :renderers="frozenRenderers"
        @change="onChange"
    />
    <p>{{ content.entry }}</p>
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
