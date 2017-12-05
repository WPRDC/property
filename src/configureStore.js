import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger({
    collapsed: true
});

 const configureStore = (preloadedState) => {
    return createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                thunkMiddleware, // lets us dispatch() functions
                //loggerMiddleware // neat middleware that logs actions
            ),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
};


export default configureStore
