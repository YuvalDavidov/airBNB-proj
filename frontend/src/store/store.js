import { createStore, combineReducers } from 'redux'

import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'
import { stayReducer } from './stay.reducer.js'
import { orderReducer } from './order.reducer.js'

const rootReducer = combineReducers({

    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
    stayModule: stayReducer,
    orderModule: orderReducer

})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



