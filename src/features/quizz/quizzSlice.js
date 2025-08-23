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
        isQuizStart: false,
        userAnswers: ([])
        // Array(quizData.length).fill(null)
    },
    reducers: {
        setFormData: (state, action) => {
            const {name, value} = action.payload
            state.formData[name] = value
            state.formData[name] = value
            state.formData[name] = value
        },
        setScore: (state) => state.score += 1,
        setCorrectAnswer: (state) => state.correctAnswer += 1,
        setIncorrectAnswer: (state) => state.incorrectAnswer += 1,
        setSkippedAnswer: (state) => state.skippedAnswer += 1,
        setCrrIndex: (state) => state.crrIndex += 1,
        setQuestionInterval: (state, action) => { },
        setUserAnswer: (state, action) => { }
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
            })
            .addCase(fetchedQuizData.rejected, (state, action) => {
                state.errors = action.error?.message || 'Something went wrong'
                state.status = 'rejected'
                state.isLoading = false
            })
    }
})

export const { setFormData } = quizSlice.actions

export const quizReducer = quizSlice.reducer