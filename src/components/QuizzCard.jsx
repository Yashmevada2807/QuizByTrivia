import React, { useContext, useState } from 'react'
import { quizDataContext } from '../ContextApi'

const QuizzCard = () => {

  const { data, loading, crrIndex, setCrrIndex, quizData, score, setScore, userAnswers, setUserAnswers } = useContext(quizDataContext)
  const Question = quizData[crrIndex]
  const options = [Question.correct_answer, ...Question.incorrect_answers]

  const nextQuestion = () => {
    if (crrIndex < quizData.length - 1) {
      setCrrIndex(crrIndex + 1)
    } else {
      console.log(score)
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
    console.log('index-', index);
  }

  const submitCorrectAnswer = (ans) => {
    const updatedAnswers = [...userAnswers]
    updatedAnswers[crrIndex] = ans
    console.log(updatedAnswers);
    setUserAnswers(updatedAnswers)
    if (ans === Question.correct_answer) {
      setScore(prev => prev + 1)
      console.log('right Answer');
    } else {
      console.log('Wrong Answer');
    }
  }

  return (
    <>
      <div className=' min-w-[300px] w-screen min-h-screen flex px-4 py-4 bg-gray-900'>
        <div className="quizSection relative w-1/1 border-r border-gray-800 ">
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
                  // if (correctAnswer) {
                  //   if (choice === quizData[crrIndex].correct_answer) {
                  //     style += "bg-green-500 text-white";
                  //   } else if (choice === correctAnswer) {
                  //     style += "bg-red-500 text-white";
                  //   } else {
                  //     style += "bg-gray-900";
                  //   }
                  // } else {
                  //   style += "hover:border-gray-600";
                  // }
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
            <div className="buttons  absolute bottom-7 gap-6  right-2 py-1 mr-18  flex justify-between items-center">
              <button
                onClick={PrevQuestion}
                className='border  border-gray-600 hover:border-gray-500 cursor-pointer text-gray-200 font-semibold px-8 py-2 rounded-md'
              >
                Previous
              </button>
              <button
                onClick={nextQuestion}
                // disabled={!correctAnswer}
                // className={`px-10 right-0  py-2 rounded-md ${!correctAnswer || crrIndex === quizData.length - 1 ? " cursor-not-allowed hover:bg-orange-700" : " cursor-pointer"}  bg-orange-600 text-gray-200  font-semibold`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="QuestionsSection w-1/3  text-gray-200">
          <h1 className=' px-4 flex items-center justify-center py-1  text-3xl'>Total Questions</h1>
          <div className="quesCircles mt-16  grid  grid-cols-5  px-9 py-3  items-center gap-8">
            {
              quizData.map((q, idx) => {
                return <li
                  key={idx}
                  onClick={() => findQuestionWithIndex(idx)}
                  className={`border flex justify-center cursor-pointer items-center rounded-full ${idx === crrIndex ? ' text-gray-200 border-green-500' : 'bg-gray-800'} w-10 h-10 `}
                >
                {idx + 1}
                </li>
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizzCard

