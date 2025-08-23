import React, { useContext, useEffect, useMemo, useState } from 'react'
import { quizDataContext } from '../ContextApi'
import LuminaAiChatBot from './LuminaAiChatBot'
import { toast, Bounce } from 'react-toastify'
import SubmitModalCard from './SubmitModalCard'
const QuizzCard = ({ onSubmit }) => {

  const { setCorrectAnswer, setWrongAnswer, setSkipedAnswer, crrIndex, setCrrIndex, quizData, setScore, userAnswers, setUserAnswers, answerStatus, setAnswerStatus, isAskAiTrue, setIsAskAiTrue, isModal, setIsModal, percentage, setpercentage, crrquestionTimer, setCrrQuestionTimer, timeIntervalByQuestion, setTimeIntervalByQuestion, isRunning, setisRunning } = useContext(quizDataContext)

  const Question = quizData[crrIndex]
  const options = useMemo(() => {
    return [Question.correct_answer, ...Question.incorrect_answers].sort(() => Math.random() - 0.5)
  }, [Question])
  const ansCount = answerStatus.filter((status) => status === 'correct' || status === 'wrong').length


  // useEffect(() => {
  //   if (quizData.length > 0) {
  //     startTimer(crrIndex)
  //   }
  // }, [quizData.length])
  // useEffect(() => {
  //   return () => {
  //     // cleanup all intervals when component unmounts
  //     Object.values(timeIntervalByQuestion).forEach((id) => clearInterval(id))
  //   }
  // }, [])
  // SkipQuestionFunc
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
      // startTimer(crrIndex + 1)
    } else {
      toast.info('You reached Last Question', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

  }

  // SubmitQuizFunc
  const SubmitQuiz = () => {
    // onSubmit()
    setIsModal(true)
    console.log('Your Clicked submit button');

  }

  // NextQuestionFunc
  const nextQuestion = () => {
    if (crrIndex < quizData.length - 1) {
      setCrrIndex(crrIndex + 1)
      setIsAskAiTrue(false)
      // startTimer(crrIndex + 1)
    } else {
      toast.info('You reached Last Question', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  // PrevQuestionFunc
  const PrevQuestion = () => {
    if (crrIndex === 0) {
      console.log('you reach first Question')
      toast.info('You are at first Question', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      setCrrIndex(crrIndex - 1)
    }
  }

  // findQuestionWithIndexFunc
  const findQuestionWithIndex = (index) => {
    setCrrIndex(index)
  if(!crrquestionTimer[index]){
    startTimer(index)
  } 
  }



  const startTimer = (qIndex) => {
    setTimeIntervalByQuestion((prev) => {
      if (prev[qIndex]) return prev
      const setTimeInterval = setInterval(() => {
        setCrrQuestionTimer((prevTimer) => ({
          ...prevTimer,
          [qIndex]: (prevTimer[qIndex] || 1) + 1
        }))
      }, 1000);
      return { ...prev, [qIndex]: setTimeInterval }
    })
  }

  const stopTimer = (qIndex) => {
    setTimeIntervalByQuestion((prev) => {
      if (prev[qIndex]) {
        clearInterval(prev[qIndex])
        const { [qIndex]: _, ...rest } = prev
        return rest
      }
      return prev
    })
  }
  // Progress tracker
  useEffect(() => {
    const ansCount = answerStatus.filter((status) => status === 'correct' || status === 'wrong').length
    const progress = (ansCount / quizData.length) * 100
    setpercentage(progress.toFixed())  
  }, [userAnswers, answerStatus, quizData.length])

  // SubmitCorrectAnswerFunc
  const submitCorrectAnswer = (ans,id) => {
    if (userAnswers[crrIndex]) return
    const updatedAnswers = [...userAnswers]
    const updateStatus = [...answerStatus]
    updatedAnswers[crrIndex] = ans
    setUserAnswers(updatedAnswers)
    if (ans === Question.correct_answer) {
      setScore(prev => prev + 1)
      setCorrectAnswer(prev => prev + 1)
      setisRunning(false)
      updateStatus[crrIndex] = 'correct'
    } else {
      setWrongAnswer(prev => prev + 1)
      setisRunning(false)
      updateStatus[crrIndex] = 'wrong'
    }
    setAnswerStatus(updateStatus)
      // stopTimer(id)
  }
  // AskAiHandlerfunc
  const askForAi = () => {
    setIsAskAiTrue(true)
  }

  return (
    <>
      {/* Main Div */}
      <div className=' min-w-[300px] w-screen min-h-screen  flex px-4 bg-gray-900'>
        <div className="quizSection  w-full  sm:w-1/1  ">
          <h1 className='text-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text  font-extrabold font-sans py-3'>TriviaQuiz</h1>
          {/* Total Questions Container */}
          <div className=' py-2 mb-3 px-8 border-[0.5px] border-blue-950 rounded-2xl'>
            {/* heading */}
            <div className="heading">
              {/* header */}
              <header className='flex justify-between items-center'>
                <h1 className='text-purple-700 text-xl font-semibold  font-sans  py-1 px-2'>Quiz Navigator</h1>
                <p className='text-gray-200 pr-10'><span>{crrIndex + 1}</span> of {quizData.length} Questions</p>
              </header>
              {/* quiz navigator */}
              <div className="quizNumbers min-w-[200px] max-w-fit flex overflow-x-scroll md:overflow-auto [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:cursor-pointer px-1 mx-2 py-2 text-gray-200">
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
                      } else if (answerStatus[idx] === 'wrong') {
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
                <div className='flex justify-center items-center gap-2 px-4 border border-gray-700 rounded-md py-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="22" fill='white'><g id="stopwatch"><path className="cls-1" d="m19.83 8.46 1.25-1.53a.78.78 0 0 0 .19-.6.8.8 0 0 0-.3-.56l-1-.85a.79.79 0 0 0-.6-.19.8.8 0 0 0-.56.3l-1.2 1.45A9.35 9.35 0 0 0 14 5.13V4h1.17a.83.83 0 0 0 .83-.83V1.83a.83.83 0 0 0-.83-.83H9.83a.83.83 0 0 0-.83.83v1.34a.83.83 0 0 0 .83.83H11v1.13a9.45 9.45 0 0 0-3.78 1.48L5.93 5a.84.84 0 0 0-1.17-.11l-1 .84a.84.84 0 0 0-.12 1.17L5 8.59v.05a9.49 9.49 0 1 0 14.79-.18zm-.4-2.66.77.63-1.06 1.29a9.56 9.56 0 0 0-.75-.66zM10 2h5v1h-5zm2 2h1v1h-1zM4.49 6.43l.78-.63 1.15 1.41a9.33 9.33 0 0 0-.73.68zM12.5 23a8.5 8.5 0 1 1 8.5-8.5 8.51 8.51 0 0 1-8.5 8.5z" /><path className="cls-1" d="M13 14.29V9.5a.5.5 0 0 0-1 0v5a.47.47 0 0 0 .15.35l4 4a.48.48 0 0 0 .7 0 .48.48 0 0 0 0-.7z" /></g></svg>
                  <h1 className='text-[15px] '>
                    <span>{crrquestionTimer[crrIndex] || 1} seconds </span>

                  </h1>
                </div>
                {
                  isAskAiTrue && <div className='absolute bottom-0  right-4 z-10'><LuminaAiChatBot /> </div>
                }
              </div>
              {/* Options */}
              <div className="options mt-3">
                <ul className='p-3'>
                  {options.map((choice, id) => {
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
                        onClick={() => submitCorrectAnswer(choice,id)}
                        className={style}
                      >
                        {choice}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* buttons */}
              <div className="buttons  gap-6 py-1 mx-3  sm:flex justify-between items-center">
                <div className=''>
                  <button
                    onClick={PrevQuestion}
                    // disabled={crrIndex === 0}
                    className={`border border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer text-gray-100 bg-gray-900 hover:bg-gray-800 font-semibold mr-3 my-2   px-8 py-2 rounded-md`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={skipQuestion}
                    disabled={userAnswers[crrIndex]}
                    className={`px-10 right-0 py-2 ${userAnswers[crrIndex] ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-blue-800'} rounded-md bg-blue-950  transition-all duration-300 text-gray-100  font-semibold mr-3 my-2 border border-blue-500 `}
                  >
                    Skip & Next
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={!userAnswers[crrIndex]}
                    className={`px-10 right-0  py-2 ${!userAnswers[crrIndex] ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-orange-800 '} rounded-md bg-orange-950 transition-all duration-300 text-gray-100  font-semibold mr-3 my-2 border border-orange-500`}
                  >
                    Save & Next
                  </button>
                </div>
                <div className={`border border-red-600 ${userAnswers[crrIndex] ? 'opacity-100 transition-opacity duration-300' : null} opacity-0 rounded-lg p-2 bg-gradient-to-tl from-red-950 to-red-900`}>
                  {
                    userAnswers[crrIndex] ? <h1>Answered in <span>{crrquestionTimer[crrIndex]} </span>seconds</h1> : null
                  }
                </div>
              </div>

            </div>
            {/* Right Side */}
            <div className="md:w-[30%] border text-gray-200  px-4 py-2 border-blue-950 rounded-lg overflow-hidden">

              {/* Progress Card */}
              <div className="progressBar border mb-3 border-blue-700 bg-gradient-to-tl from-blue-950 to-blue-950 rounded-xl p-2">
                <h1 className=' flex justify-center items-center text-3xl font-sans'>Progress</h1>
                <p className='flex justify-center items-center text-gray-400 text-sm py-2'>Track your Quiz Completion</p>
                <div className="bar py-4">
                  <div className="track w-full rounded-full overflow-hidden  bg-gray-900">
                    <div
                      className={`progress bg-green-700 text-xs transition-all duration-400  text-blue-100 font-bold text-center p-1 leading-none rounded-full`}
                      style={{ width: `${percentage}%` }}
                    >
                      <h1>{percentage}%</h1>
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly py-3">
                  <div className='answeredBlock border px-4 py-2 md:px-1 md:py-1 border-blue-800 bg-gray-900 lg:px-4 lg:py-2 rounded-lg'>
                    <h1 className='  px-2 py-1 text-sm md:text-[12px] lg:text-[17px]'>Answered</h1>
                    <span className='flex justify-center items-center'>{ansCount}</span>
                  </div>
                  <div className='totalQuestionBlock border px-4 py-2 md:px-1 md:py-1 border-blue-800 bg-gray-900 lg:px-4 lg:py-2 rounded-lg'>
                    <h1 className='  px-2 py-1 text-sm md:text-[12px] lg:text-[17px]'>Total Question</h1>
                    <span className='flex justify-center items-center'>{quizData.length}</span>
                  </div>
                </div>
              </div>
              {/* LuminaAI card */}
              {
                userAnswers[crrIndex] ? (<div className={`border border-purple-600 ${userAnswers[crrIndex] ? 'opacity-100 transition-opacity duration-300' : null} rounded-xl p-2 bg-gradient-to-tl from-purple-950 to-purple-900`}>
                  <h1 className='flex justify-center items-center text-2xl font-sans'>Ask With AI</h1>
                  <div className='  flex justify-center items-center  group py-4'>
                    <button onClick={() => askForAi()} className="askAi border border-purple-700 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900  flex justify-center items-center cursor-pointer rounded-md  hover:scale-110 transition-all duration-200 text-lg font-semibold">
                      <h1 className=' flex gap-2 justify-center font-bold items-center px-3 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0 0 48 48">
                        <radialGradient id="oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1" cx="-670.437" cy="617.13" r=".041" gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ba1e3"></stop><stop offset="0" stopColor="#1ba1e3"></stop><stop offset=".3" stopColor="#5489d6"></stop><stop offset=".545" stopColor="#9b72cb"></stop><stop offset=".825" stopColor="#d96570"></stop><stop offset="1" stopColor="#f49c46"></stop></radialGradient><path fill="url(#oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1)" d="M22.882,31.557l-1.757,4.024c-0.675,1.547-2.816,1.547-3.491,0l-1.757-4.024	c-1.564-3.581-4.378-6.432-7.888-7.99l-4.836-2.147c-1.538-0.682-1.538-2.919,0-3.602l4.685-2.08	c3.601-1.598,6.465-4.554,8.002-8.258l1.78-4.288c0.66-1.591,2.859-1.591,3.52,0l1.78,4.288c1.537,3.703,4.402,6.659,8.002,8.258	l4.685,2.08c1.538,0.682,1.538,2.919,0,3.602l-4.836,2.147C27.26,25.126,24.446,27.976,22.882,31.557z"></path><radialGradient id="oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2" cx="-670.437" cy="617.13" r=".041" gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ba1e3"></stop><stop offset="0" stopColor="#1ba1e3"></stop><stop offset=".3" stopColor="#5489d6"></stop><stop offset=".545" stopColor="#9b72cb"></stop><stop offset=".825" stopColor="#d96570"></stop><stop offset="1" stopColor="#f49c46"></stop></radialGradient><path fill="url(#oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2)" d="M39.21,44.246l-0.494,1.132	c-0.362,0.829-1.51,0.829-1.871,0l-0.494-1.132c-0.881-2.019-2.467-3.627-4.447-4.506l-1.522-0.676	c-0.823-0.366-0.823-1.562,0-1.928l1.437-0.639c2.03-0.902,3.645-2.569,4.511-4.657l0.507-1.224c0.354-0.853,1.533-0.853,1.886,0	l0.507,1.224c0.866,2.088,2.481,3.755,4.511,4.657l1.437,0.639c0.823,0.366,0.823,1.562,0,1.928l-1.522,0.676	C41.677,40.619,40.091,42.227,39.21,44.246z"></path>
                      </svg>LuminaAI</h1>
                    </button>
                  </div>
                </div>) : null
              }
            </div>
          </div>
        </div>
      </div>
      {
        isModal && (
          <SubmitModalCard
            submitQuiz={onSubmit}
            closeModal={() => setIsModal(false)}
          />
        )
      }
    </>
  )
}

export default QuizzCard

