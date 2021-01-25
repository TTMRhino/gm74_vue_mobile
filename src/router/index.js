import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import About from '../views/About.vue'
import Delivery from '../views/Delivery.vue'
import Contacts from '../views/Contacts.vue'
import Cart from '../views/Cart.vue'

require('../assets/css/main.css')

Vue.use(VueRouter)

const routes = [{
        path: '',
        name: 'Home',
        component: Home
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: Catalog
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/delivery',
        name: 'Delivery',
        component: Delivery
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }
]

const router = new VueRouter({
    routes
})

export default router