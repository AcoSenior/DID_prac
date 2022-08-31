import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { createWrapper } from 'next-redux-wrapper';

import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'

import rootSaga from '../sagas/index.js';
import rootReducer from '../reducers/index.js';

// export const store = createStore(rootReducer, enhancer);
// sagaMiddleware.run(rootSaga);

const persistMiddleWare = (store) => (dispatch) => async (
    action,
) => {
    if (action.type === REHYDRATE && action.key ==='root') {
        console.log('root REHYDRATE')
        dispatch(action)
    }
    else {
        dispatch(Action)
    }
}

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' 
        ? compose(applyMiddleware(...middleware))
        : composeWithDevTools(applyMiddleware(...middleware));

    const store = createStore(rootReducer, enhancer)
    // const persistor = persistStore(store);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store
}

const wrapper = createWrapper(configureStore,persistMiddleWare, { debug: process.env.NODE_ENV === 'development' });

export default wrapper