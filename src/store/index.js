import Vue from 'vue'
import Vuex from 'vuex'
import basic from './modules/basic'
import user from './modules/user'
import common from './modules/common'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        basic,
        user,
        common,
        products
    }
})