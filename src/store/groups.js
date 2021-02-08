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
        asyncGetItems(context, { subGroup, page = 1 }) {

            /*if (typeof payload.page === 'undefined') {
                 payload.page = 1
             }*/
            //если подгруппа не установленна то меняем api запрос (отправлем без нее)
            let options = typeof subGroup === 'undefined' ? '?page=' + page : '?subgroup=' + subGroup + '&page=' + page;
            console.log(options);

            Vue.http.get('https://whamster.ru/api/items.jsonld' + options)
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