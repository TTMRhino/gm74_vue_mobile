import Vue from 'vue'
export default {
    state: {
        mainGroups: [],
        items: []
    },
    mutations: {
        setGroups(state, payload) {
            state.mainGroups = payload
        },
        setItems(state, payload) {
            state.items = payload
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
        asyncGetItems(context, payload) {
            payload.page = 1
            let options = typeof payload.subGroup === 'undefined' ? '?page=' + payload.page : '?subgroup=' + payload.subGroup + '&page=' + payload.page;
            console.log(options);

            Vue.http.get('https://whamster.ru/api/items' + options, { headers: { 'accept': 'application/json' } })
                .then(response => {
                    return response.json()
                })
                .then(items => {
                    context.commit('setItems', items)
                });
        }
    },
    getters: {
        computedGroups(state) {
            return state.mainGroups
        },
        computedItems(state) {
            return state.items
        }
    }
}