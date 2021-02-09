import Vue from 'vue'
export default {
    state: {
        mainGroups: [],
        items: [],
        nextPage: '',
        previousPage: '',
        lastPage: '',
        firstPage: ''
    },
    mutations: {
        setGroups(state, payload) {
            state.mainGroups = payload
        },
        setItems(state, payload) {
            state.items = payload
        },
        //устанавливаем в  state адрес следующей страницы товаров
        setNextPage(state, payload) {
            //console.log("payload = " + payload)
            state.nextPage = payload
        },
        //устанавливаем в  state адрес предыдущий страницы товаров
        setPreviousPage(state, payload) {
            //console.log("payload = " + payload)
            state.previousPage = payload
        },
        setFirstPage(state, payload) {
            state.firstPage = payload
        },
        setLastPage(state, payload) {
            state.lastPage = payload
        }
    },
    actions: {
        asyncGetGroups(context) {
            Vue.http.get('https://whamster.ru/api/main_groups', { headers: { 'accept': 'application/json' } })
                .then(response => {
                    return response.json()
                })
                .then(mainGroups => {
                    context.commit('setGroups', mainGroups)
                });
        },
        asyncGetItems(context, { apiString = '/api/items.jsonld' }) {

            Vue.http.get('https://whamster.ru' + apiString)
                .then(response => {
                    return response.json()
                })
                .then(items => {
                    context.commit('setItems', items) //отпраляем данные для установки в лобальный state

                    context.commit('setNextPage', items["hydra:view"]["hydra:next"])
                    context.commit('setPreviousPage', items["hydra:view"]["hydra:previous"])

                    context.commit('setFirstPage', items["hydra:view"]["hydra:first"])
                    context.commit('setLastPage', items["hydra:view"]["hydra:last"])
                });

            console.log('apiString = ' + apiString);

        }
    },
    getters: {
        computedGroups(state) {
            return state.mainGroups
        },
        computedItems(state) {
            return state.items
        },
        getNextPage(state) {
            return state.nextPage
        },
        getPreviousPage(state) {
            return state.previousPage
        },
        getFirstPage(state) {
            return state.firstPage
        },
        getLastPage(state) {
            return state.lastPage
        }
    }
}