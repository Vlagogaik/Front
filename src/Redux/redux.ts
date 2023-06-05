import {combineReducers, createStore} from "redux";
import cartsReducer from "./carts-reducer";

//
// let reducers = combineReducers({
//     carts: cartsReducer,
//
// });

let reducers = combineReducers({
    carts: cartsReducer,

});

let store = createStore(reducers);



export default store