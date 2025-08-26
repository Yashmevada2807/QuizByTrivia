import React, { useContext, useEffect, useMemo, useState } from 'react'
import { quizDataContext } from '../ContextApi'
import LuminaAiChatBot from './LuminaAiChatBot'
import { toast, Bounce } from 'react-toastify'
import SubmitModalCard from './SubmitModalCard'
import { useDispatch, useSelector } from 'react-redux'
import { setIncrementCrrIndex, setDecrementCrrIndex, setCrrIndex, setUserAnswer, setAnswerStatus, setCorrectAnswer, setIncorrectAnswer, setIsAskAi, setIsSubmitQuiz } from '../features/quizz/quizzSlice'

const QuizzCard = () => {

  const { isQuizStart, isLoading, status, isAskAI, quizData, crrIndex, userAnswers, answerStatus, score } = useSelector(s => s.quiz)
  const dispatch = useDispatch()

  const Question = quizData[crrIndex]
  const options = [Question.correct_answer, ...Question.incorrect_answers]

  const answeredCount = answerStatus.filter(
    (status) => status === "correct" || status === "incorrect"
  ).length;

  const progress = (answeredCount / quizData.length) * 100;


  const skipQuestion = () => {
    dispatch(setAnswerStatus({ index: crrIndex, status: 'skipped' }))
    dispatch(setIncrementCrrIndex())
  }

  // NextQuestionFunc
  const nextQuestion = () => {
    if (crrIndex < quizData.length - 1) {
      dispatch(setIncrementCrrIndex())
      dispatch(setIsAskAi(false))
    } else {
      dispatch(setIsSubmitQuiz(true))
      console.log('No more questions');
      console.log('Total Score - ', score);
    }
  }

  // PrevQuestionFunc
  const PrevQuestion = () => {
    if (crrIndex === 0) {
      console.log('First Question');
    } else {
      dispatch(setDecrementCrrIndex())
    }
  }

  // findQuestionWithIndexFunc
  const findQuestionWithIndex = (index) => {
    dispatch(setCrrIndex(index))
  }

  // StartTimerFunc
  const startTimer = (qIndex) => { }

  // StopTimerFunc
  const stopTimer = (qIndex) => { }

  // Progress tracker
  // useEffect(() => {
  //   console.log('Status - ', status)
  //   console.log('Loading - ', isLoading)
  //   console.log('QuizStarted - ', isQuizStart);
  //   console.log('Data - ', quizData)
  //   console.log('Question - ', Question)
  //   console.log('Options - ', options)
  //   console.log('userAnswer - ', userAnswers);
  //   console.log('UserAnsStatus - ', answerStatus);
  //   console.log('UserAnsStatus - ', percentage);
  // }, [quizData, Question, isLoading, status, isQuizStart, options, userAnswers, answerStatus, percentage])

  // SubmitCorrectAnswerFunc

  const submitCorrectAnswer = (ans, id) => {
    // prevent overwrite if already answered
    if (userAnswers[id] !== null) return;
    if (ans === Question.correct_answer) {
      dispatch(setAnswerStatus({ index: id, status: 'correct' }));
      dispatch(setCorrectAnswer())
    } else {
      dispatch(setAnswerStatus({ index: id, status: 'incorrect' }));
      dispatch(setIncorrectAnswer())
    }
    
    dispatch(setIsAskAi(true))
    // store the chosen answer at that index
    dispatch(setUserAnswer({ index: id, answer: ans }));
  };

  // AskAiHandlerfunc
  const askForAi = () => { }

  return (
    <>
      {/* Main Div */}
      <div className=' min-w-[300px] w-screen min-h-screen  flex px-4 bg-gray-900'>
        <div className="quizSection  w-full  sm:w-1/1  ">
          <h1 className='text-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text  font-extrabold font-sans py-3'>TriviaQuiz</h1>

          {/* Total Questions Navigator */}
          <div className=' py-2 mb-3 px-8 border-[0.5px] border-blue-950 rounded-2xl'>
            {/* heading */}
            <div className="heading">

              {/* header */}
              <header className='flex justify-between items-center'>
                <h1 className='text-purple-700 text-xl font-semibold  font-sans  py-1 px-2'>Quiz Navigator</h1>
                <p className='text-gray-200 md:px-4'><span>{crrIndex + 1}</span> of {quizData.length} Questions</p>
              </header>

              {/* quiz navigator */}
              <div className="quizNumbers min-w-[200px] max-w-fit flex overflow-x-scroll md:overflow-auto [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:cursor-pointer px-1 mx-2 py-2 text-gray-200">
                {/* Pending Display QuizNavigator */}
                <ul className='flex items-center  gap-4'>
                  {
                    quizData.map((q, idx) => {
                      let style = ' border rounded-lg w-10 h-10  flex justify-center items-center transition-all duration-200 text-gray-100 font-semibold cursor-pointer '
                      if (answerStatus[idx] === 'correct') {
                        if (idx === crrIndex) {
                          style += 'border-green-600 bg-green-950 scale-105'
                        } else {
                          style += 'border-green-600 bg-green-950'
                        }
                      } else if (answerStatus[idx] === 'incorrect') {
                        if (idx === crrIndex) {
                          style += 'border-red-600 bg-red-950 scale-105'
                        } else {
                          style += 'border-red-600 bg-red-950 '
                        }
                      } else if (answerStatus[idx] === 'skipped') {
                        if (idx === crrIndex) {
                          style += 'border-yellow-600 bg-yellow-950 scale-115'
                        } else {
                          style += 'border-yellow-600 bg-yellow-950 '
                        }
                      } else if (idx === crrIndex) {
                        style += 'border-blue-800 bg-gray-900 scale-115'
                      } else {
                        style += 'border-gray-800 '
                      }
                      return <li
                        onClick={() => findQuestionWithIndex(idx)}
                        key={idx}
                        className={style}
                      >
                        {idx + 1}
                      </li>
                    })
                  }
                </ul>
              </div>

              {/* about Answer */}
              <div className="instructions pt-3 mx-4">
                <ul className='flex justify-start items-center text-gray-200 gap-5'>
                  <li className='text-[11px]  flex justify-center  items-center gap-x-3'><span className='border bg-yellow-950 border-yellow-700 rounded-lg flex justify-center items-center text-gray-100 font-semibold text-md  w-8 h-8  px-3 py-1.5'>1 </span>Skiped</li>
                  <li className='text-[11px] flex justify-center items-center gap-x-3'><span className='border bg-green-950 border-green-800 rounded-lg flex justify-center items-center text-gray-100 font-semibold text-md  w-8 h-8  px-3 py-1.5'>2 </span> Correct </li>
                  <li className='text-[11px] flex justify-center items-center gap-x-3'><span className='border bg-red-950 border-red-800 rounded-lg flex justify-center items-center text-gray-100 font-semibold text-md  w-8 h-8  px-3 py-1.5'>3 </span> Wrong </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quiz Container */}
          <div className=" w-full md:flex  md:gap-4">

            {/* left Side */}
            <div className="quizBox w-full mb-2 md:w-[70%] border border-blue-950 rounded-lg overflow-hidden p-2 text-gray-200 ">

              {/* information */}
              <div className=' flex justify-between items-center '>
                <h1 className=' w-fit px-3 py-2 text-[13px] md:text-[15px] md:px-6 md:py-1 rounded-lg bg-gray-800 '><span>Q{crrIndex + 1}.</span> {Question.category}</h1>
                <h1 className=' w-fit px-3 py-2 text-[13px] md:text-[15px] md:px-6 md:py-1 rounded-lg bg-gray-800 capitalize'><span>difficulty : </span >{Question.difficulty}</h1>
              </div>

              {/* Question */}
              <div className=' flex justify-between items-center py-0 mt-4 gap-2'>
                <p className=' flex justify-center items-center px-4 text-lg md:text-2xl text-gray-300 font-bold '>{Question.question}</p>
                {/* Timer */}
                <div className='flex justify-center items-center gap-2 px-4 border border-gray-700 rounded-md py-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="22" fill='white'><g id="stopwatch"><path className="cls-1" d="m19.83 8.46 1.25-1.53a.78.78 0 0 0 .19-.6.8.8 0 0 0-.3-.56l-1-.85a.79.79 0 0 0-.6-.19.8.8 0 0 0-.56.3l-1.2 1.45A9.35 9.35 0 0 0 14 5.13V4h1.17a.83.83 0 0 0 .83-.83V1.83a.83.83 0 0 0-.83-.83H9.83a.83.83 0 0 0-.83.83v1.34a.83.83 0 0 0 .83.83H11v1.13a9.45 9.45 0 0 0-3.78 1.48L5.93 5a.84.84 0 0 0-1.17-.11l-1 .84a.84.84 0 0 0-.12 1.17L5 8.59v.05a9.49 9.49 0 1 0 14.79-.18zm-.4-2.66.77.63-1.06 1.29a9.56 9.56 0 0 0-.75-.66zM10 2h5v1h-5zm2 2h1v1h-1zM4.49 6.43l.78-.63 1.15 1.41a9.33 9.33 0 0 0-.73.68zM12.5 23a8.5 8.5 0 1 1 8.5-8.5 8.51 8.51 0 0 1-8.5 8.5z" /><path className="cls-1" d="M13 14.29V9.5a.5.5 0 0 0-1 0v5a.47.47 0 0 0 .15.35l4 4a.48.48 0 0 0 .7 0 .48.48 0 0 0 0-.7z" /></g></svg>
                  <h1 className='text-[15px] '>
                    {/* <span>{crrquestionTimer[crrIndex] || 1} seconds </span> */}
                  </h1>
                </div>
              </div>

              {/*Pending Options */}
              <div className="options mt-3">
                <ul className='p-3'>
                  {
                    options.map((choice, id) => {
                      let style =
                        " px-4 py-2 sm:px-4 sm:py-3 border border-gray-700 rounded-lg   mb-2 cursor-pointer transition-all ";
                      let selectedAns = userAnswers[crrIndex]
                      if (selectedAns) {
                        if (choice === Question.correct_answer) {
                          style += 'bg-green-950 border-green-500 text-gray-200'
                        } else if (choice === selectedAns) {
                          style += 'bg-red-950 border-red-500 text-gray-200'
                        }
                      } else {
                        style += 'hover:border-gray-500'
                      }
                      return (
                        <li
                          key={id}
                          onClick={() => submitCorrectAnswer(choice, crrIndex)}
                          className={style}
                        >
                          {choice}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>

              {/* buttons */}
              <div className="buttons  gap-6 py-1 mx-3  sm:flex justify-between items-center">
                {/* previousBtn */}
                <button
                  onClick={PrevQuestion}
                  className={`border border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer text-gray-100 bg-gray-900 hover:bg-gray-800 font-semibold mr-3 my-2   px-8 py-2 rounded-md`}
                >
                  Previous
                </button>
                {/* SkipBtn */}
                <button
                  onClick={skipQuestion}
                  disabled={userAnswers[crrIndex]}
                  className={`px-10 right-0 py-2 ${userAnswers[crrIndex] ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-blue-800'} rounded-md bg-blue-950  transition-all duration-300 text-gray-100  font-semibold mr-3 my-2 border border-blue-500 `}
                >
                  Skip & Next
                </button>
                {/* NextBtn */}
                <button
                  onClick={nextQuestion}
                  disabled={!userAnswers[crrIndex]}
                  className={`px-10 right-0  py-2 ${!userAnswers[crrIndex] ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-orange-900 '} rounded-md bg-orange-950 transition-all duration-300 text-gray-100  font-semibold mr-3 my-2 border border-orange-500`}
                >
                  {
                    crrIndex === quizData.length - 1 ? <p>Submit</p> : <p>Save & Next</p>
                  }
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="md:w-[30%] border text-gray-200  px-4 py-3 border-blue-950 rounded-lg overflow-hidden">

              {/* Progress Card */}
              <div className="progressBar border mb-3 border-blue-700 bg-gradient-to-tl from-blue-950 to-blue-950 rounded-xl p-2">
                <h1 className=' flex justify-center items-center text-3xl font-sans'>Progress</h1>
                <p className='flex justify-center items-center text-gray-400 text-sm py-2'>Track your Quiz Completion</p>
                {/* ProgressBar */}
                <div className="bar ">
                  <div className="track w-full rounded-full overflow-hidden  bg-gray-900">
                    <div
                      className={`progress bg-green-700 text-xs transition-all duration-400  text-blue-100 font-bold text-center p-1 leading-none rounded-full`}
                      style={{ width: `${progress}%` }}
                    >
                      <h1>{progress}%</h1>
                    </div>
                  </div>
                </div>
                {/* Answered and TotalQuestion Display */}
                <div className="flex justify-evenly py-3">
                  <div className='answeredBlock border px-4 py-2 md:px-1 md:py-1 border-blue-800 bg-gray-900 lg:px-4 lg:py-2 rounded-lg'>
                    <h1 className='  px-2 py-1 text-sm md:text-[12px] lg:text-[17px]'>Answered</h1>
                    <span className='flex justify-center items-center'>{answeredCount}</span>
                  </div>
                  <div className='totalQuestionBlock border px-4 py-2 md:px-1 md:py-1 border-blue-800 bg-gray-900 lg:px-4 lg:py-2 rounded-lg'>
                    <h1 className='  px-2 py-1 text-sm md:text-[12px] lg:text-[17px]'>Total Question</h1>
                    <span className='flex justify-center items-center'>{quizData.length}</span>
                  </div>
                </div>
              </div>

              {/* LuminaAI card */}
              {
                isAskAI ? <div className={`progressBar ${ isAskAI ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'} border mb-3 border-purple-700 bg-gradient-to-r from-pink-800 via-purple-800 to-blue-800 rounded-xl p-2`}>
                <h1 className=' flex justify-center items-center text-3xl font-sans'>Ask With AI</h1>
                <p className='flex justify-center items-center text-gray-300 text-sm py-2'>Search with LuminaAI</p>
                <div className='flex justify-center py-1 items-center'>
                  <button className =' bg-gradient-to-br from-blue-600 via-violet-600  to-purple-600  hover:scale-105 transition-all duration-300 cursor-pointer text-2xl rounded-md px-4 py-2'>
                  <h1 className='text-gray-100'>LuminaAI</h1>
                </button>
                </div>
              </div> : null
              }

              {/* Submit Btn */}
             {/* {
              crrIndex === quizData.length - 1 ?  <div className=' flex justify-center items-center'>
                <button className={`px-10 right-0  py-2 ${!userAnswers[crrIndex] ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-orange-800 '} rounded-md bg-orange-950 transition-all duration-300 text-gray-100  font-semibold mr-3 my-2 border border-orange-500`}>Submit</button>
              </div> : null
             } */}
            </div>
          </div>
        </div>
      </div>
      {/* {
        isModal && (
          <SubmitModalCard
            submitQuiz={onSubmit}
            closeModal={() => setIsModal(false)}
          />
        )
      } */}
    </>
  )
}

export default QuizzCard