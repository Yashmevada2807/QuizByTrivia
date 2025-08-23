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
  const [loading, setIsloading] = useState(false)
  const [crrIndex, setCrrIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState(0)
  const [skipedAnswer, setSkipedAnswer] = useState(0)
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null))
  const [answerStatus, setAnswerStatus] = useState([])
  const [isQuizStart, setIsQuizStart] = useState(false)
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false)
  const [isAskAiTrue, setIsAskAiTrue] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [percentage, setpercentage] = useState(0)
  const [crrquestionTimer, setCrrQuestionTimer] = useState({})
  const [timeIntervalByQuestion, setTimeIntervalByQuestion] = useState({})
  const [isRunning, setisRunning] = useState(false)


  const data = async () => {
    setIsloading(true); // show loader
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
      // setLoading(false); // hide loader
    }
  }

  return (
    <>
      <quizDataContext.Provider value={{ formData, setFormData, quizData, setQuizData, data, crrIndex, setCrrIndex, loading,  setIsloading, score, setScore, correctAnswer, setCorrectAnswer, userAnswers, setUserAnswers, isQuizStart, setIsQuizStart, wrongAnswer, setWrongAnswer, skipedAnswer, setSkipedAnswer, isSubmitQuiz, setIsSubmitQuiz, answerStatus, setAnswerStatus, isAskAiTrue, setIsAskAiTrue, isModal, setIsModal, percentage, setpercentage, crrquestionTimer, setCrrQuestionTimer, timeIntervalByQuestion, setTimeIntervalByQuestion, isRunning, setisRunning}} >
        {children}
      </quizDataContext.Provider>
    </>
  )
}

export default ContextApi
