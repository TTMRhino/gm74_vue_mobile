//import Vue from 'vue'
export default {
    state: {
        cart: {
            items: [],
            totalQuantity: 0,
            totalPrice: 0
        }
    },
    mutations: {
        setGoods(state, { vendor, quantity }) {
            state.cart.items.push({ 'vendor': vendor, 'quantity': quantity })
            state.cart.totalQuantity += quantity
        }
    },
    actions: {
        addGoodsToCart(context, goods) {
            context.commit('setGoods', goods)
        }
    },
    getters: {
        getCart(state) {
            return state.cart
        }
    }
}