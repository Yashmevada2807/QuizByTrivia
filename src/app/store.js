import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "../features/quizz/quizzSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'


const quizPersistConfig = {
    key: 'quiz',
    storage,
}

const rootReducer = combineReducers({
    quiz: persistReducer(quizPersistConfig, quizReducer)
})

export const store = configureStore({
    reducer : rootReducer
})

export const persistor = persistStore(store)