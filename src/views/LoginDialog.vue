<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStateStore } from '@/stores/state'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const authState = useAuthStateStore()
let authenticated = ref('')
const showPwd = ref(false)
let display = true
const message = ref('')
const email = ref('bjensen@example.com')
const password = ref('hifalutin')
const emailRules = ref([
    value => {
        if (value) return true
        return 'You must enter an email.'
    },
])
const passwordRules = ref([
    value => {
        if (value) return true
        return 'You must enter an password.'
    },
])

function login() {
    authState.login(email.value, password.value)
    authenticated = true
}

function logout() {
    authState.logout()
    authenticated = false
}
</script>

<template>
    <v-btn icon="mdi-account-outline" size="large" color="primary">
        Click me
        <v-menu location="end" activator="parent">
            <template v-if="authenticated">
                <v-btn @click="logout()">Logout</v-btn>
            </template>

            <template v-else>
                <v-card class="mx-auto pa-12 pb-8" title="Login" text="Enter your email and password to authenticate:"
                    rounded="lg" elevation="8" min-width="500px">

                    <v-form fast-fail @submit.prevent="login">
                        <v-text-field prepend-inner-icon="mdi-email" v-model="email" :rules="emailRules"
                            label="E-mail"></v-text-field>
                        <v-text-field v-model="password" prepend-inner-icon="mdi-lock"
                            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showPwd ? 'text' : 'password'"
                            :rules="passwordRules" counter label="Password"
                            @click:append="showPwd = !showPwd"></v-text-field>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="mt-2" text="Login" type="submit" block></v-btn>
                        </v-card-actions> </v-form>
                </v-card>
            </template>
        </v-menu>
    </v-btn>
</template>

<style></style>