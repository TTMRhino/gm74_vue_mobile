//import Vue from 'vue'
import VueCookie from 'vue-cookie'
export default {
    state: {
        cart: {
            items: [],
            totalQuantity: 0,
            totalPrice: 0
        }
    },
    mutations: {
        setGoods(state, { vendor, quantity, price, item }) {

            let index = state.cart.items.findIndex(item => item.vendor == vendor);

            if (index >= 0) {
                //console.log(index)
                state.cart.items[index].quantity += quantity;
            } else {
                state.cart.items.push({
                    'vendor': vendor,
                    'quantity': quantity,
                    'price': price,
                    'item': item
                })
            }


            //общее колличесво товара
            state.cart.totalQuantity += quantity

            state.cart.totalPrice += quantity * price

            //console.log(state.cart);
            //удаляем куку перед ее заполнением
            VueCookie.delete('mcart');
            //добавляем все в куку            
            VueCookie.set('mcart', JSON.stringify(state.cart), 1);
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