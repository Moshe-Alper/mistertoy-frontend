import { combineReducers, legacy_createStore as createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

// const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

// * For Debugging
window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })
