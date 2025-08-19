import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchQuiz = createAsyncThunk('/quizz/fetchQuiz', async () => {
//     const res = await axios.get('https://opentdb.com/api.php?amount=15&difficulty=medium&type=multiple')
//     console.log(res.data)
// })