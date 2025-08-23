import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "../features/quizz/quizzSlice";


export const store = configureStore({
    reducer : {
       quiz: quizReducer
    }
})