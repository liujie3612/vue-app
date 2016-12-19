import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import 'common/styles/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

let app = Vue.extend(App)

let router = new VueRouter({
	//自定义激活时的类名  默认：v-link-active
	linkActiveClass: 'active'

})

router.map({
    '/goods': {
        component: goods
    },
    '/ratings': {
        component: ratings
    },
    '/seller': {
        component: seller
    }
})

router.start(app, '#app')

/*默认路径*/
router.go('/goods')
