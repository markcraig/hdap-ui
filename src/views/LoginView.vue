<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'

const mail = ref('')
const password = ref('')
const message = ref('')

async function login() {
    if (!mail.value || !password.value) {
        return
    }
    message.value = `${mail.value} ${password.value}`
    try {
        let res = await axios.get('/hdap', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                _queryFilter: `mail eq '${mail.value}'`,
                _fields: '_id',
                scope: 'sub'
            }
        })
        const credentials = JSON.stringify({ password: `${password.value}` })
        res = await axios.post(`/hdap/${res.data.result[0]._id}?_action=authenticate`, credentials, {
            headers: { 'Content-Type': 'application/json' }
        })
        message.value = `JWT: ${res.data.access_token}, expires in: ${res.data.expires_in} seconds`
    } catch (error) {
        console.error(error)
    }
}

login()

watch(mail, login)
</script>

<template>
    <div class="login">
        <h1 class="green">Login view</h1>
        <input v-model="mail" placeholder="Email address" type="email">
        <input v-model="password" placeholder="Password" type="password">
        <div><button class="green" @click="login">Log in</button></div>
        <p>{{ message }}</p>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .login {
        display: grid;
        align-items: center;
    }

    button {
        float: right;
    }
}
</style>
