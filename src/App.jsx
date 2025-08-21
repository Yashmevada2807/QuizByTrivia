import { useCallback, useContext, useEffect, useState } from 'react'
import './App.css'
import QuizzCard from './components/QuizzCard'
import UserChoice from './components/UserChoice'
import { quizDataContext } from './ContextApi'
import { Route, Routes } from 'react-router-dom'
import SubmitQuiz from './components/SubmitQuiz'
import LuminaAiChatBot from './components/LuminaAiChatBot'
import SubmitModal from './components/SubmitModal'

function App() {

  const { isQuizStart, setIsQuizStart, isSubmitQuiz, setIsSubmitQuiz } = useContext(quizDataContext)
  return (
    <>
      <div className=' w-full min-h-screen flex justify-center items-center bg-gray-900'>
        {
          isQuizStart ? (
            isSubmitQuiz ? (
              <SubmitQuiz />
            ) : (
              <QuizzCard onSubmit={() => setIsSubmitQuiz(true)} />
            )
          ) : (
            <UserChoice onStart={() => setIsQuizStart(true)} />
          )
        }
        {/* <SubmitModal/> */}
      </div>
    </>
  )
}

export default App
