import React, { useContext, useEffect, useState } from 'react'
import { quizDataContext } from '../ContextApi'

const QuizzCard = ({ onSubmit }) => {

  const { setCorrectAnswer, setWrongAnswer, setSkipedAnswer, crrIndex, setCrrIndex, quizData, setScore, userAnswers, setUserAnswers, answerStatus, setAnswerStatus } = useContext(quizDataContext)
  const Question = quizData[crrIndex]
  const options = [Question.correct_answer, ...Question.incorrect_answers]

  const selectedAnswer = userAnswers[crrIndex]

  const skipQuestion = () => {
    const updatedAns = [...userAnswers]
    const updateStatus = [...answerStatus]
    updatedAns[crrIndex] = null
    updateStatus[crrIndex] = 'skipped'
    if (crrIndex < quizData.length - 1) {
      setCrrIndex(crrIndex + 1)
      setUserAnswers(updatedAns)
      setAnswerStatus(updateStatus)
      setSkipedAnswer(prev => prev + 1)
    }
  }
  const SubmitQuiz = () => {
    onSubmit()
  }

  const nextQuestion = () => {
    if (crrIndex < quizData.length - 1) {
      setCrrIndex(crrIndex + 1)
    }
  }

  const PrevQuestion = () => {
    if (crrIndex === 0) {
      console.log('you reach first Question')
    } else {
      setCrrIndex(crrIndex - 1)
    }
  }

  const findQuestionWithIndex = (index) => {
    setCrrIndex(index)
  }


  useEffect(() => {
    console.log(userAnswers)
    console.log(answerStatus)
  }, [userAnswers, setUserAnswers, answerStatus, setAnswerStatus])

  const submitCorrectAnswer = (ans) => {
    if (userAnswers[crrIndex]) return
    const updatedAnswers = [...userAnswers]
    const updateStatus = [...answerStatus]
    updatedAnswers[crrIndex] = ans
    setUserAnswers(updatedAnswers)
    if (ans === Question.correct_answer) {
      setScore(prev => prev + 1)
      console.log('right Answer');
      setCorrectAnswer(prev => prev + 1)
      updateStatus[crrIndex] = 'correct'
    } else {
      console.log('Wrong Answer');
      setWrongAnswer(prev => prev + 1)
      updateStatus[crrIndex] = 'wrong'
    }
    setAnswerStatus(updateStatus)
  }

  return (
    <>
      <div className=' min-w-[300px] w-screen min-h-screen flex px-4 py-4 bg-gray-900'>
        <div className="quizSection relative w-full  sm:w-1/1 border-r border-gray-800 ">
          <h1 className='text-3xl  text-gray-200  font-extrabold font-sans py-1'>TriviaQuiz</h1>
          <div className="quizBox text-gray-200 mt-9">
            <div className=' flex justify-between items-center '>
              <h1 className=' w-fit mr-4 px-6 py-1 rounded-lg bg-gray-800 '><span>Q{crrIndex + 1}.</span> {Question.category}</h1>
              <h1 className=' w-fit mr-8 px-6 py-1 rounded-lg bg-gray-800 capitalize'><span>difficulty : </span >{Question.difficulty}</h1>
            </div>
            <p className=' px-1 text-3xl text-gray-300 font-bold mt-12'>{Question.question}</p>
            <div className="options mt-8">
              <ul className='mr-18 p-3'>
                {options.map((choice, id) => {
                  let style =
                    "px-4 py-3 border border-gray-700 rounded-lg  mb-2 cursor-pointer transition-all ";
                  let selectedAns = userAnswers[crrIndex]
                  if (selectedAns) {
                    if (choice === Question.correct_answer) {
                      style += 'bg-green-500 text-gray-200'
                    } else if (choice === selectedAns) {
                      style += 'bg-red-700 text-gray-200'
                    }
                  } else {
                    style += 'hover:border-gray-600'
                  }
                  return (
                    <li
                      key={id}
                      onClick={() => submitCorrectAnswer(choice)}
                      className={style}
                    >
                      {choice}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="buttons  absolute bottom-18 gap-6  right-2 py-1 mr-18  flex justify-between items-center">
              <button
                onClick={PrevQuestion}
                disabled={crrIndex === 0}
                className={`border border-gray-600 hover:border-gray-500 ${crrIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} text-gray-200 font-semibold px-8 py-2 rounded-md`}
              >
                Previous
              </button>
              <button
                onClick={skipQuestion}
                disabled={userAnswers[crrIndex]}
                className={`px-10 right-0 py-2 ${userAnswers[crrIndex] ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-gray-200  font-semibold`}
              >
                Skip & Next
              </button>
              <button
                onClick={nextQuestion}
                disabled={!userAnswers[crrIndex]}
                className={`px-10 right-0  py-2 ${!userAnswers[crrIndex] ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-md bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-gray-200  font-semibold`}
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>
        <div className="QuestionsSection sm:w-1/3 py-14 text-gray-200">
          <h1 className=' px-4 flex items-center justify-center py-1  text-3xl'>Total Questions</h1>
          <div className="quesCircles mt-11  grid  grid-cols-5  px-14 pb-10   items-center gap-x-2 gap-y-4">

            {
              quizData.map((q, idx) => {
                let style = 'border flex justify-center cursor-pointer items-center rounded-full w-10 h-10 '
                // border ${idx === crrIndex ? 'border-gray-700' : 'border-gray-500'} flex justify-center cursor-pointer items-center rounded-full w-10 h-10 

                if (answerStatus[idx] === 'correct') {
                  style += 'border-green-500'
                } else if (answerStatus[idx] === 'wrong') {
                  style += 'border-red-500'
                } else if(answerStatus[idx] === 'skipped'){
                  style += 'border-yellow-500'
                }
                else {
                  style += 'border-gray-500'
                }
                return <li
                  key={idx}
                  onClick={() => findQuestionWithIndex(idx)}
                  className={style}
                >
                  {idx + 1}
                </li>
              })
            }
          </div>
          <div className="aware px-15 ">
            <ul className='flex justify-between items-center gap-5'>
              <li className='text-[11px]  flex justify-center  items-center gap-x-3'><span className='border bg-gray-900 border-yellow-400 rounded-full  px-3 py-1.5'>1 </span>Skiped</li>
              <li className='text-[11px] flex justify-center items-center gap-x-3'><span className='border bg-gray-900 border-green-500 rounded-full  px-3 py-1.5'>2 </span> Correct </li>
              <li className='text-[11px] flex justify-center items-center gap-x-3'><span className='border bg-gray-900 border-red-500 rounded-full  px-3 py-1.5'>3 </span> wrong </li>
            </ul>
          </div>
          <div className='flex justify-center text-3xl my-14 items-center '>
            <p><span>{crrIndex + 1}</span> of {quizData.length} Questions</p>
          </div>
          <div className="submitButton mt-15  flex justify-center items-center">
            <button onClick={SubmitQuiz} className='bg-orange-600 hover:bg-orange-700 transition-all duration-200 hover:scale-105 hover:text-gray-100 cursor-pointer text-gray-200 text-2xl font-semibold px-8 py-2 rounded-md'>Submit Quiz</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizzCard

