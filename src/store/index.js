import Vuex from 'vuex'
import Vue from 'vue'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../firebase'
Vue.use(Vuex)

const todosRef = db.collection('items')

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    init: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('todos', todosRef.orderBy('created', 'asc'))  
    }),
    add: firestoreAction((context, item) => {
      todosRef.add({
          title: item.title,
          checked: true,
          description: item.description,
          created: Date.now()
      })
    }),
    remove: firestoreAction((context, id) => {
        todosRef.doc(id).delete()
    }),
    toggle: firestoreAction((context, todo) => {
        todosRef.doc(todo.id).update({
            checked: !todo.checked
        })
    })
  }
})