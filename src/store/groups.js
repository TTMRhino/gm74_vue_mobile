import Vue from 'vue'
export default {
    state: {
        mainGroups: [],
        items: [],
        nextPage: '',
        previousPage: '',
        lastPage: '',
        firstPage: '',
        currentGroup: '', //текущая группа (для перехо по страницам нжна)
        itemsLoad: true,
    },

    mutations: {
        setGroups(state, payload) {
            state.mainGroups = payload
        },
        setItems(state, payload) {
            state.items = payload;
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
        },
        setCurrentGroup(state, payload) {
            state.currentGroup = payload
        },
        setItemsLoad(state, payload) {
            state.itemsLoad = payload
        }
    },
    actions: {
        asyncGetGroups(context) {
            Vue.http.get('https://www.goodmarket74.ru/api/main_groups', { headers: { 'accept': 'application/json' } })
                .then(response => {
                    return response.json()
                })
                .then(mainGroups => {
                    context.commit('setGroups', mainGroups)
                });
        },
        asyncGetItems(context, { apiPage = '/api/items.jsonld?page=1', apiGroup = '' }) {

            context.commit('setItemsLoad', true)
            console.log('Начали загрузку !!!');


            Vue.http.get('https://www.goodmarket74.ru' + apiPage + apiGroup)
                .then(response => {
                    return response.json()
                })
                .then(items => {
                    context.commit('setItems', items) //отпраляем данные для установки в лобальный state

                    context.commit('setCurrentGroup', apiGroup)

                    context.commit('setNextPage', items["hydra:view"]["hydra:next"])
                    context.commit('setPreviousPage', items["hydra:view"]["hydra:previous"])

                    context.commit('setFirstPage', items["hydra:view"]["hydra:first"])
                    context.commit('setLastPage', items["hydra:view"]["hydra:last"])
                }).then(() => {
                    context.commit('setItemsLoad', false)
                    console.log('Закончили грузить )))');

                });



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
        },
        getCurrentGroup(state) {
            return state.currentGroup
        },
        getStatusLoading(state) {
            return state.itemsLoad
        }
    }
}