import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const quizDataContext = createContext()


const ContextApi = ({ children }) => {

    const [formData, setFormData] = useState({
        amount: 10,
        difficulty: 'easy',
        type: 'multiple',
    })

    const [quizData, setQuizData] = useState([])
    const [loading, setLoading] = useState(false)
    const [crrIndex, setCrrIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null))
    const data = async () => {
    setLoading(true); // show loader
    try {
      const res = await axios.get("https://opentdb.com/api.php?", {
        params: {
          amount: formData.amount,
          type: formData.type,
          difficulty: formData.difficulty
        }
      });
      setQuizData(res.data.results);  
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false); // hide loader
    }
    }

    return (
        <>
            <quizDataContext.Provider value={{ formData, setFormData, quizData, setQuizData, data, crrIndex, setCrrIndex, loading, score, setScore, correctAnswer, setCorrectAnswer, userAnswers, setUserAnswers }} >
                {children}
            </quizDataContext.Provider>
        </>
    )
}

export default ContextApi
