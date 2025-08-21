import React, { useContext, useEffect, useMemo, useState } from 'react'
import { quizDataContext } from '../ContextApi'
import LuminaAiChatBot from './LuminaAiChatBot'
import { toast, Bounce } from 'react-toastify'
import SubmitModalCard from './SubmitModalCard'
const QuizzCard = ({ onSubmit }) => {

  const { setCorrectAnswer, setWrongAnswer, setSkipedAnswer, crrIndex, setCrrIndex, quizData, setScore, userAnswers, setUserAnswers, answerStatus, setAnswerStatus, isAskAiTrue, setIsAskAiTrue, isModal, setIsModal, percentage, setpercentage } = useContext(quizDataContext)
  const Question = quizData[crrIndex]
  const options = useMemo(() => {
    return [Question.correct_answer, ...Question.incorrect_answers].sort(() => Math.random() - 0.5)
  }, [Question])
  // console.log(crrIndex);
  // console.log(quizData.length);
  
  // const CalProgress = [crrIndex / quizData.length] * 100
  
  const ansCount = answerStatus.filter((status) => status === 'correct' || status === 'wrong').length
  
  
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
  const SubmitQuiz = () => {
    // onSubmit()
    setIsModal(true)
    console.log('Your Clicked submit button');

  }

  const nextQuestion = () => {
    if (crrIndex < quizData.length - 1) {
      setCrrIndex(crrIndex + 1)
      setIsAskAiTrue(false)
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

  const findQuestionWithIndex = (index) => {
    setCrrIndex(index)
  }


  useEffect(() => {
    console.log('ua',userAnswers)
    console.log('ansst',answerStatus)
    const ansCount = answerStatus.filter((status) => status === 'correct' || status === 'wrong').length
    const progress = (ansCount/ quizData.length) * 100
    setpercentage(progress.toFixed())
    console.log(progress);
    
  }, [userAnswers, answerStatus, quizData.length])

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
      // setpercentage(CalProgress.toFixed())
      // setSkipedAnswer(prev => prev - 1)
      updateStatus[crrIndex] = 'correct'
    } else {
      console.log('Wrong Answer');
      // setSkipedAnswer(prev => prev - 1)
      setWrongAnswer(prev => prev + 1)
      // setpercentage(CalProgress.toFixed())
      updateStatus[crrIndex] = 'wrong'
    }
    setAnswerStatus(updateStatus)
  }

  const askForAi = () => {
    setIsAskAiTrue(true)
  }

  return (
    <>
      <div className=' min-w-[300px] w-screen min-h-screen  flex px-4 bg-gray-900'>
        <div className="quizSection  w-full  sm:w-1/1   border-gray-800 ">
          <h1 className='text-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text  font-extrabold font-sans py-3'>TriviaQuiz</h1>

          {/* Total Questions Container */}
          <div className=' py-4 my-3 px-8 border-[0.5px] border-blue-950 rounded-2xl'>
            <div className=''>
              <div className="heading">
                <header className='flex justify-between items-center'>
                  <h1 className='text-purple-700 text-xl font-semibold  font-sans  py-1 px-2'>Quiz Navigator</h1>
                  <p className='text-gray-200 pr-10'><span>{crrIndex + 1}</span> of {quizData.length} Questions</p>
                </header>
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
                <div className="instructions pt-3 mx-2">
                  <ul className='flex justify-start items-center text-gray-200 gap-5'>
                    <li className='text-[11px]  flex justify-center  items-center gap-x-3'><span className='border bg-yellow-950 border-yellow-700 rounded-lg flex justify-center items-center text-gray-100 font-semibold text-lg  w-10 h-10  px-3 py-1.5'>1 </span>Skiped</li>
                    <li className='text-[11px] flex justify-center items-center gap-x-3'><span className='border bg-green-950 border-green-800 rounded-lg flex justify-center items-center text-gray-100 font-semibold text-lg  w-10 h-10  px-3 py-1.5'>2 </span> Correct </li>
                    <li className='text-[11px] flex justify-center items-center gap-x-3'><span className='border bg-red-950 border-red-800 rounded-lg flex justify-center items-center text-gray-100 font-semibold text-lg  w-10 h-10  px-3 py-1.5'>3 </span> Wrong </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Container */}
          <div className=" w-full flex gap-2">
            <div className="quizBox sm:w-[70%] border border-blue-900 rounded-lg overflow-hidden p-2 text-gray-200 ">
              <div className=' flex justify-between items-center '>
                <h1 className=' w-fit mr-4 px-6 py-1 rounded-lg bg-gray-800 '><span>Q{crrIndex + 1}.</span> {Question.category}</h1>
                <h1 className=' w-fit mr-8 px-6 py-1 rounded-lg bg-gray-800 capitalize'><span>difficulty : </span >{Question.difficulty}</h1>
              </div>
              <div className=' flex justify-between items-center py-2 mt-12'>
                <p className=' flex justify-center items-center px-1 text-3xl text-gray-300 font-bold '>{Question.question}</p>
                {/* <div className='relative  flex justify-center items-center  group mr-15'>
                <button onClick={() => askForAi()} className="askAi  flex justify-center items-center cursor-pointer rounded-full  hover:scale-110 transition-all duration-200 text-lg font-semibold">
                  <h1><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="40" viewBox="0 0 48 48">
                    <radialGradient id="oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1" cx="-670.437" cy="617.13" r=".041" gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1ba1e3"></stop><stop offset="0" stop-color="#1ba1e3"></stop><stop offset=".3" stop-color="#5489d6"></stop><stop offset=".545" stop-color="#9b72cb"></stop><stop offset=".825" stop-color="#d96570"></stop><stop offset="1" stop-color="#f49c46"></stop></radialGradient><path fill="url(#oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1)" d="M22.882,31.557l-1.757,4.024c-0.675,1.547-2.816,1.547-3.491,0l-1.757-4.024	c-1.564-3.581-4.378-6.432-7.888-7.99l-4.836-2.147c-1.538-0.682-1.538-2.919,0-3.602l4.685-2.08	c3.601-1.598,6.465-4.554,8.002-8.258l1.78-4.288c0.66-1.591,2.859-1.591,3.52,0l1.78,4.288c1.537,3.703,4.402,6.659,8.002,8.258	l4.685,2.08c1.538,0.682,1.538,2.919,0,3.602l-4.836,2.147C27.26,25.126,24.446,27.976,22.882,31.557z"></path><radialGradient id="oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2" cx="-670.437" cy="617.13" r=".041" gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1ba1e3"></stop><stop offset="0" stop-color="#1ba1e3"></stop><stop offset=".3" stop-color="#5489d6"></stop><stop offset=".545" stop-color="#9b72cb"></stop><stop offset=".825" stop-color="#d96570"></stop><stop offset="1" stop-color="#f49c46"></stop></radialGradient><path fill="url(#oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2)" d="M39.21,44.246l-0.494,1.132	c-0.362,0.829-1.51,0.829-1.871,0l-0.494-1.132c-0.881-2.019-2.467-3.627-4.447-4.506l-1.522-0.676	c-0.823-0.366-0.823-1.562,0-1.928l1.437-0.639c2.03-0.902,3.645-2.569,4.511-4.657l0.507-1.224c0.354-0.853,1.533-0.853,1.886,0	l0.507,1.224c0.866,2.088,2.481,3.755,4.511,4.657l1.437,0.639c0.823,0.366,0.823,1.562,0,1.928l-1.522,0.676	C41.677,40.619,40.091,42.227,39.21,44.246z"></path>
                  </svg></h1>
                </button>
                <p className='absolute flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center text-sm w-fit -bottom-10 -right-7 border rounded p-1'>Ask With LuminaAI</p>
              </div> */}
                {
                  isAskAiTrue && <div className='absolute bottom-0 -right-100 z-10'><LuminaAiChatBot /> </div>
                }
              </div>
              <div className="options mt-8">
                <ul className='p-3'>
                  {options.map((choice, id) => {
                    let style =
                      "px-4 py-3 border border-gray-700 rounded-lg  mb-2 cursor-pointer transition-all ";
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
                        onClick={() => submitCorrectAnswer(choice)}
                        className={style}
                      >
                        {choice}
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* buttons */}
              <div className="buttons  gap-6 py-1 mx-3  sm:flex items-center">
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
            </div>
            <div className="sm:w-[30%] border text-gray-200  px-4 py-2 border-blue-900 rounded-lg overflow-hidden">
              <div className="progressBar border border-blue-950 bg-gradient-to-tl from-blue-950 to-blue-900 rounded-xl p-2">
                <h1 className=' flex justify-center items-center text-3xl font-sans'>Progress</h1>
                <p className='flex justify-center items-center text-gray-400 text-sm py-2'>Track your Quiz Completion</p>
                <div className="bar py-4">
                  <div className="track w-full rounded-full overflow-hidden  bg-blue-950">
                    <div 
                    className={`progress bg-green-700 text-xs font-medium transition-all duration-400  text-blue-100 font-bold text-center p-1 leading-none rounded-full`}
                    style={{width: `${percentage}%`}}
                    >
                      <h1>{percentage}%</h1>
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly py-3">
                  <div className='answeredBlock border border-blue-600 px-6 py-4 rounded-lg'>
                    <h1 className='  px-2 py-1 text-xl'>Answered</h1>
                    <span className='flex justify-center items-center'>{ansCount}</span>
                  </div>
                  <div className='totalQuestionBlock border border-blue-600 px-6 py-4 rounded-lg'>
                    <h1 className='  px-2 py-1 text-xl'>Total Question</h1>
                    <span className='flex justify-center items-center'>{quizData.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Container */}
        {/* <div className="QuestionsSection sm:w-1/3  py-14 text-gray-200">
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
                } else if (answerStatus[idx] === 'skipped') {
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
        </div> */}
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

