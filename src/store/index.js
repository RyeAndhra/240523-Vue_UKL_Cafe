import { createStore } from "vuex";

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export default createStore({
  state: {
    cart: []
  },
  getters: {
    menuQty: state => menu => {
      const item = state.cart.find(i => i.id_menu === menu.id_menu)

      if (item) {
        return item.quantity
      
      } else {
        return null
      }
    },
    cartItems: state => {
      return state.cart
    },
    cartTotal: state => {
      return state.cart.reduce((a, b) => a + (b.harga * b.quantity), 0)
    }
  },
  mutations: {
    addToCart(state, menu) {
      let item = state.cart.find((i) => i.id_menu === menu.id_menu)

      if (item) {
        item.quantity++

      } else {
        state.cart.push({...menu, quantity: 1 })
      }

      updateLocalStorage(state.cart);
    },
    removeItem(state, menu) {
        let item = state.cart.find(i => i.id_menu === menu.id_menu)
        if (item) {
            if (item.quantity > 1) {
                item.quantity--
            } else {
                state.cart = state.cart.filter(i => i.id_menu !== menu.id_menu)
            }
        }
        updateLocalStorage(state.cart);
    },
    UpdateCartFromLocalStorage(state) {
        const cart = localStorage.getItem('cart')
        if (cart) {
            state.cart = JSON.parse(cart)
        }
    },
    reset(state) {
        state.cart = [];
        updateLocalStorage(state.cart);
    }
  },
  actions: {

  },
  modules: {

  },
});


// import Vue from 'vue'
// import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

// Vue.use(Vuex)

// /* eslint-disable no-new */
// const store = new Vuex.Store({
//   plugins: [createPersistedState()],
//   modules: {
//   }
// })

// export default store
