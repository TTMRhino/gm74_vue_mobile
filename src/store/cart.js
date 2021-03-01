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

        //добовление товара в Store (при выборе из каталога)
        setGoods(state, { vendor, quantity, price, item, id }) {
            let index = state.cart.items.findIndex(item => item.vendor == vendor);

            if (index >= 0) {
                state.cart.items[index].quantity += quantity;
            } else {
                state.cart.items.push({
                    'vendor': vendor,
                    'quantity': quantity,
                    'price': price,
                    'item': item,
                    'id': id
                })
            }
            //общее колличесво товара
            state.cart.totalQuantity += quantity

            state.cart.totalPrice += quantity * price

            //удаляем куку перед ее заполнением
            VueCookie.delete('mcart');
            //добавляем все в куку            
            VueCookie.set('mcart', JSON.stringify(state.cart), 1);
        },
        deleteGoods(state, { index, quantity, price }) {
            state.cart.items.splice(index, 1); //удаляем товар из store 
            state.cart.totalQuantity -= quantity;
            state.cart.totalPrice -= quantity * price;

            //удаляем куку перед ее заполнением
            VueCookie.delete('mcart');
            //добавляем все в куку            
            VueCookie.set('mcart', JSON.stringify(state.cart), 1);
        },
        //отчищаем корзину
        clearCart(state) {
            state.cart.items = [];
            state.cart.totalQuantity = 0;
            state.cart.totalPrice = 0;
        },
    },
    actions: {
        addGoodsToCart(context, goods) {
            context.commit('setGoods', goods)
        },
        deleteGoodsToCart(context, goods) {
            context.commit('deleteGoods', goods)
        },
        clearCart(context) {
            context.commit('clearCart')
        }

    },
    getters: {
        getCart(state) {
            return state.cart
        }
    }
}