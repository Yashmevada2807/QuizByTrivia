import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedQuizData = createAsyncThunk('quiz/fetchquizdata', async ({ amount, type, difficulty }) => {

    const response = await axios.get('https://opentdb.com/api.php?', {
        params: {
            amount: amount,
            type: type,
            difficulty: difficulty,
        }
    })
    return response.data()
})

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quizData: [],
        isLoading: false,
        score: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        skippedAnswer: 0,
        crrIndex: 0,
        questionInterval: {},
        isModal: false,
        isSubmitQuiz: false,
        isQuizStart: false,
        userAnswers: ([])
        // Array(quizData.length).fill(null)
    },
    reducers: {
        setScore: (state) => state.score += 1,
        setCorrectAnswer: (state) => state.correctAnswer += 1,
        setIncorrectAnswer: (state) => state.incorrectAnswer += 1,
        setSkippedAnswer: (state) => state.skippedAnswer += 1,
        setCrrIndex: (state) => state.crrIndex += 1,
        setQuestionInterval: (state, action) => {},
        setUserAnswer: (state, action) => {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedQuizData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchedQuizData.fulfilled, (state, action) => {
                state.isLoading = false
                state.quizData.push(...action.payload.quizData)
            })
            .addCase(fetchedQuizData.rejected, (state, action) => {
                state.errors = action.error?.message || 'Something went wrong'
                state.isLoading = false
            })
    }
})

export const { setQuizData, setIsLoading, setScore, setCorrectAnswer, setIncorrectAnswer, setSkippedAnswer, setCrrIdx, setQuestionInterval, setIsModal, setIsSubmitQuiz, setisQuizStart, setUserAnswer } = quizSlice.actions

export const quizReducer = quizSlice.reducer