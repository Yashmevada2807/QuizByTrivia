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
        questionTimer: {},
        questionInterval: {},
        isModal: false,
        isSubmitQuiz: false,
        isAskAI: false,
        isQuizStart: false,
        userAnswers: [],
        answerStatus: [],

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
        setSkippedAnswer: (state) => {
            state.skippedAnswer += 1
        },
        setCrrIndex: (state, action) => {
            state.crrIndex = action.payload
        },
        setIncrementCrrIndex: (state) => {
            state.crrIndex += 1
        },
        setDecrementCrrIndex: (state) => {
            state.crrIndex -= 1
        },
        setIncrementTimer: (state, action) => {
            const index = action.payload
            state.questionTimer[index] = (state.questionTimer[index] || 0) + 1
        },
        setStartTimer: (state, action) => {
            const { index, intervalId } = action.payload
            state.questionInterval[index] = intervalId
        },
        setStopTimer: (state, action) => {
            const index = action.payload
            if (state.questionInterval[index]) {
                clearInterval(state.questionInterval[index])
                // delete state.questionInterval[index]
            }
        },
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
        setisModal: (state, action) => {
            state.isModal = action.payload
        },
        setIsSubmitQuiz: (state, action) => {
            state.isSubmitQuiz = action.payload
            Object.values(state.questionInterval).forEach(id => clearInterval(id))
            state.questionInterval = {}
            state.questionTimer = {}
        },
        resetQuiz: (state) => {
            const n = state.quizData.length
            state.isQuizStart = true
            state.userAnswers = Array(n).fill(null)
            state.answerStatus = Array(n).fill(null)
            state.isSubmitQuiz = false
            state.score = 0
            state.crrIndex = 0
            state.isAskAI = false
        },
        resetTimer: (state) => {
            Object.values(state.questionInterval).forEach(id => clearInterval(id))
            state.questionInterval = {}
            state.questionTimer = {}
        },
        resetQuizOnReload: (state) => {
            if (state.quizData.length > 0) {
                const n = state.quizData.length
                state.isQuizStart = true
                state.userAnswers = Array(n).fill(null)
                state.answerStatus = Array(n).fill(null)
                state.isSubmitQuiz = false
                state.score = 0
                state.crrIndex = 0
                state.questionInterval = {}
                state. questionTimer = {}
                state.isAskAI = false
                // reset other fields you need
            }
        },
        backToMainMenu: (state) => {
            const n = state.quizData.length
            state.quizData = []
            state.isQuizStart = false
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

export const { setFormData, setCrrIndex, setIncrementCrrIndex, setDecrementCrrIndex, setUserAnswer, setAnswerStatus, setCorrectAnswer, setIncorrectAnswer, setIsAskAi, setIsSubmitQuiz, resetQuiz, backToMainMenu, setStopTimer, setStartTimer, setIncrementTimer, resetTimer, resetQuizOnReload, setisModal } = quizSlice.actions

export const quizReducer = quizSlice.reducer