import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedQuizData = createAsyncThunk('/quiz/fetchquizdata', async ({ amount, type, difficulty }) => {
    const response = await axios.get('https://opentdb.com/api.php?', {
        params: {
            amount: amount,
            difficulty: difficulty,
            type: type,
        }
    })
    return response.data
})

export const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        formData: {
            amount: 10,
            difficulty: 'easy',
            type: 'multiple',
        },
        quizData: [],
        isLoading: false,
        status: null,
        score: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        skippedAnswer: 0,
        crrIndex: 0,
        questionInterval: {},
        isModal: false,
        isSubmitQuiz: false,
        isAskAI : false,
        isQuizStart: false,
        userAnswers: [],
        answerStatus: []
    },
    reducers: {
        setFormData: (state, action) => {
            const { name, value } = action.payload
            state.formData[name] = value
            state.formData[name] = value
            state.formData[name] = value
        },
        setCorrectAnswer: (state) => {
            state.score += 1
        },
        setIncorrectAnswer: (state) => {
            state.score === 0
        },
        setSkippedAnswer: (state) => state.skippedAnswer += 1,
        setCrrIndex: (state, action) => {
            state.crrIndex = action.payload
        },
        setIncrementCrrIndex: (state) => {
            state.crrIndex += 1
        },
        setDecrementCrrIndex: (state) => {
            state.crrIndex -= 1
        },
        setQuestionInterval: (state, action) => { },
        setUserAnswer: (state, action) => {
            const { index, answer } = action.payload
            state.userAnswers[index] = answer
        },
        setAnswerStatus: (state, action) => {
            const { index, status } = action.payload
            state.answerStatus[index] = status
        },
        setIsAskAi: (state, action) => {
            state.isAskAI = action.payload
        },
        setIsSubmitQuiz : (state, action) => {
            state.isSubmitQuiz = action.payload
        },
        resetQuiz : (state, action) => {
            const n = state.quizData.length
            state.isQuizStart = true
            state.userAnswers = Array(n).fill(null)
            state.answerStatus = Array(n).fill(null)
            state.isSubmitQuiz = false
            state.score = 0
            state.crrIndex = 0
            state.isAskAI = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedQuizData.pending, (state) => {
                state.isLoading = true
                state.status = 'pending'
            })
            .addCase(fetchedQuizData.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = 'success'
                state.quizData = action.payload.results
                state.isQuizStart = true
                state.userAnswers = Array(action.payload.results.length).fill(null)
                state.answerStatus = Array(action.payload.results.length).fill(null)
            })
            .addCase(fetchedQuizData.rejected, (state, action) => {
                state.errors = action.error?.message || 'Something went wrong'
                state.status = 'rejected'
                state.isLoading = false
            })
    }
})

export const { setFormData, setCrrIndex, setIncrementCrrIndex, setDecrementCrrIndex, setUserAnswer, setAnswerStatus, setCorrectAnswer, setIncorrectAnswer, setIsAskAi, setIsSubmitQuiz, resetQuiz } = quizSlice.actions

export const quizReducer = quizSlice.reducer