
<script>
import axios from 'axios'

export default {
    data: () => ({
        showPwd: false,
        dialog: false,
        message: '',
        email: '',
        password: '',
        emailRules: [
            value => {
                if (value) return true
                return 'You must enter an email.'
            },
        ],
        passwordRules: [
            value => {
                if (value) return true
                return 'You must enter an password.'
            },
        ],
    }),

    methods: {
        login() {
            if (!this.email || !this.password) {
                return
            }
            try {
                axios.get('/hdap', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        _queryFilter: `mail eq '${this.email}'`,
                        _fields: '_id',
                        scope: 'sub'
                    }
                }).then(function (res) {
                    const credentials = JSON.stringify({ password: `${this.password}` })
                    axios.post(`/hdap/${res.data.result[0]._id}?_action=authenticate`, credentials, {
                        headers: { 'Content-Type': 'application/json' }
                    }).then(function (res) {
                        this.message = `JWT: ${res.data.access_token}, expires in: ${res.data.expires_in} seconds`
                    })
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
};
</script>

<template>
    <v-btn @click="dialog = true"> Open Dialog </v-btn>

    <v-dialog v-model="dialog" width="auto" persistent transition="dialog-bottom-transition">
        <v-card
            class="mx-auto pa-12 pb-8"
            title="Login" 
            text="Enter your email and password to authenticate:"
            rounded="lg"
            elevation="8"
        >
            <v-form fast-fail @submit.prevent="login">
                <v-text-field 
                    prepend-inner-icon="mdi-email" 
                    v-model="email"
                    :rules="emailRules" 
                    label="E-mail"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    prepend-inner-icon="mdi-lock" 
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPwd ? 'text' : 'password'"
                    :rules="passwordRules"
                    counter
                    label="Password"
                    @click:append="showPwd = !showPwd"
                ></v-text-field>
                <v-btn class="mt-2" text="Login" type="submit" block></v-btn>
            </v-form>
            <p>{{ message }}</p>
        </v-card>
    </v-dialog>

</template>

<style></style>
