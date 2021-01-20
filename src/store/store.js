import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //todo
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))||"" 
    // token: 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjNAMTEuY28iLCJjcmVhdGVkIjoxNjEwOTU5MDQ1MjM4LCJleHAiOjE2MTA5NjA4NDV9.SXLJAltNvm-Un3kOErATzq9_DgFUTRR_0Cz3c1BUGFtLdBRY2FSD8_sK2MIiWm8kfNjOaVbWcYDrD9VcEBV0Lg',
    // userInfo: {
    //   userName: 'Connor',
    //   manage: false
    // }
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token", '')
      sessionStorage.setItem("userInfo", JSON.stringify(''))
    }
  },
  getters: {
    // get
    getUser: state => {
      return state.userInfo
    }

  },
  actions: {
  },
  modules: {
  }
})
