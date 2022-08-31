import { combineReducers } from "redux";
import {HYDRATE} from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persist = {
    key:'user',
    storage, 
    whitelist:['user', 'adminLogin']
};

const rootReducer = (state, action) => {
    switch(action.type){
        case HYDRATE:
            console.log("HYDRATE", action);
            return action.payload
        default : {
            const combineReducer = combineReducers({
    
            })
            return combineReducer(state, action)
        }
    }
}

export default persistReducer(persist, rootReducer);