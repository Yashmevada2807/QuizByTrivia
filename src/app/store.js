import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "../features/quizz/quizzSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'


const quizPersistConfig = {
    key: 'quiz',
    storage,
    // whitelist: [
    //     'formData',
    //     'quizData',
    //     'userAnswers',
    //     'answerStatus',
    //     'score',
    //     'crrIndex',
    //     'isQuizStart',
    //     'isSubmitQuiz'
    // ],
    // blacklist: [
    //     'isLoading',
    //     'status',
    //     'errors',
    //     'questionTimer',
    //     'questionInterval',
    //     'isModal',
    //     'isAskAI'
    // ]

}

const rootReducer = combineReducers({
    quiz: persistReducer(quizPersistConfig, quizReducer)
})

export const store = configureStore({
    reducer: rootReducer
})

export const persistor = persistStore(store)