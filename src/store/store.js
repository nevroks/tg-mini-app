import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice.js"
import configReducer from "./slices/configSlice.js"

const reducers = combineReducers(
    {
        user: userReducer,
        config: configReducer
    })
export const store = configureStore({
    reducer: reducers,
})