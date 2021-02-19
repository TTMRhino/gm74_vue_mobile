import Vue from 'vue'
export default {
    state: {
        mainGroups: [],
        items: [],
        nextPage: '',
        previousPage: '',
        lastPage: '',
        firstPage: '',
        currentGroup: '' //текущая группа (для перехо по страницам нжна)
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
        },
        setCurrentGroup(state, payload) {
            state.currentGroup = payload
        }
    },
    actions: {
        asyncGetGroups(context) {
            Vue.http.get('http://127.0.0.1:8000/api/main_groups', { headers: { 'accept': 'application/json' } })
                .then(response => {
                    return response.json()
                })
                .then(mainGroups => {
                    context.commit('setGroups', mainGroups)
                });
        },
        asyncGetItems(context, { apiPage = '/api/items.jsonld?page=1', apiGroup = '' }) {

            //console.log('apiString = ' + apiPage + apiGroup);

            Vue.http.get('http://127.0.0.1:8000' + apiPage + apiGroup)
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
        }
    }
}