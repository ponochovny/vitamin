import { createStore } from 'vuex'

import basic from './modules/basic'
import user from './modules/user'
import common from './modules/common'
import products from './modules/products'

const store = createStore({
    modules: {
        basic,
        user,
        common,
        products
    }
})

export default store
