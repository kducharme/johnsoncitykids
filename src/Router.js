import Vue from 'vue'
import Router from 'vue-router'
import Outings from './Views/Outings'
import About from './Views/About'

Vue.use(Router)

export default new Router({
    base: '/outings',
    routes: [
        {
            path: '/',
            name: 'outings',
            component: Outings
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
    ]
})