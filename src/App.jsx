import { useCallback, useContext, useEffect, useState } from 'react'
import './App.css'
import QuizzCard from './components/QuizzCard'
import UserChoice from './components/UserChoice'
import { quizDataContext } from './ContextApi'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [isQuizStart, setIsQuizStart] = useState(false)
  const {quizData} = useContext(quizDataContext)
  return (
    <>
      <div className=' w-full min-h-screen flex justify-center items-center bg-gray-900'>
        {
          isQuizStart ?(
            <QuizzCard/>
          ) : (
            <UserChoice onStart={() => setIsQuizStart(true)}/>
          )
        }
      </div>
    </>
  )
}

export default App
