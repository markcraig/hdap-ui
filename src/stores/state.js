import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStateStore = defineStore('authState', {
  state: () => ({
    dn: '',
    fullName: '',
    jwt: ''
  }),
  getters: {
    getDn: (state) => state.dn,
    getFullName: (state) => state.fullName,
    getJwt: (state) => state.jwt
  },
  actions: {
    addAuthzHeader(request) {
      let jwt = this.jwt
      if (jwt) {
        request.headers.set('Authorization', `Bearer ${jwt}`)
      }
      return request
    },
    async login(email, password) {
      if (!email || !password) {
        return
      }
      try {
        axios
          .get('/hdap', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              _queryFilter: `mail eq '${email}' or uid eq '${email}'`,
              _fields: '_id,cn',
              scope: 'sub'
            }
          })
          .then(function (res) {
            let cn = res.data.result[0].cn[0] || email
            let id = res.data.result[0]._id
            axios
              .post(`/hdap/${id}?_action=authenticate`, {
                password: `${password}`
              }, {
                headers: { 'Content-Type': 'application/json' }
              })
              .then(function (res) {
                localStorage.setItem('dn', id)
                localStorage.setItem('fullName', cn)
                localStorage.setItem('jwt', res.data.access_token)
              })
          })
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      localStorage.clear('dn')
      localStorage.clear('fullName')
      localStorage.clear('jwt')
    }
  }
});