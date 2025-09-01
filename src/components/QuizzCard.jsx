import React, { useContext, useEffect, useMemo, useState } from 'react'
import { quizDataContext } from '../ContextApi'
import LuminaAiChatBot from './LuminaAiChatBot'
import { toast, Bounce } from 'react-toastify'
import SubmitModalCard from './SubmitModalCard'
import { useDispatch, useSelector } from 'react-redux'
import { setIncrementCrrIndex, setDecrementCrrIndex, setCrrIndex, setUserAnswer, setAnswerStatus, setCorrectAnswer, setIncorrectAnswer, setIsAskAi, setIsSubmitQuiz, setStopTimer, setStartTimer, setIncrementTimer, resetQuizOnReload, setisModal, toggleAiBot, setShowAiBot, backToMainMenu, setcancelQuizModal, tickTimer } from '../features/quizz/quizzSlice'
import CancelModalCard from './CancelModalCard'

const QuizzCard = () => {

  const { isQuizStart, isLoading, status, isModal, isAskAI, quizData, userAnswers, answerStatus, score, questionTimer, questionInterval, showAiBot, cancelQuizModal } = useSelector(s => s.quiz)
  const dispatch = useDispatch()
  const crrIndex = useSelector((state) => state.quiz.crrIndex);

  const Question = quizData[crrIndex]
  const suffleOptions = useMemo(() => {
    const options = [Question.correct_answer, ...Question.incorrect_answers].sort(() => Math.random() - 0.5)
    return options
  }, [Question])

  const answeredCount = answerStatus.filter(
    (status) => status === "correct" || status === "incorrect"
  ).length;

  const progress = (answeredCount / quizData.length) * 100;
  // timer tracker
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = "";
    if (hours > 0) result += `${hours} hr `;
    if (minutes > 0) result += `${minutes} min `;
    result += `${seconds} sec`;

    return result.trim();
  };

  useEffect(() => {
    const entries = performance.getEntriesByType('navigation')
    const isReload = entries.length > 0 && entries[0].type === 'reload'
    if (quizData?.length > 0) {
      if (isReload) {
        Object.values(questionInterval).forEach((id) => clearInterval(id));
        dispatch(resetQuizOnReload())
      } else {
        handlestartTimer(0)
      }
    }
  }, [quizData, dispatch])

  // StartTimerFunc
  const handlestartTimer = (qIndex) => {
    if (!questionInterval[qIndex]) {
      const intervalId = setInterval(() => {
        dispatch(setIncrementTimer(qIndex))
      }, 1000);
      dispatch(setStartTimer({ index: qIndex, intervalId }))
    }
  }

  // StopTimerFunc
  const handlestopTimer = (qIndex) => {
    dispatch(setStopTimer(qIndex))
  }

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
    handlestopTimer(id)
    dispatch(setIsAskAi(true))
    // store the chosen answer at that index
    dispatch(setUserAnswer({ index: id, answer: ans }));
  };

  // AskAiHandlerfunc
  const askForAi = () => {
    dispatch(setShowAiBot(true))
  }

  const backToHome = () => {
    dispatch(setcancelQuizModal(true))
  }

  // Skip Question
const skipQuestion = () => {
  if (crrIndex < quizData.length - 1) {
    dispatch(setAnswerStatus({ index: crrIndex, status: "skipped" }));

    // stop current timer
    handlestopTimer(crrIndex);

    // move next
    const nextIndex = crrIndex + 1;
    dispatch(setIncrementCrrIndex());

    // start/resume next
    if (!questionInterval[nextIndex]) {
      handlestartTimer(nextIndex);
    }
  } else {
    console.log("Last Question");
  }
};

// NextQuestionFunc
const nextQuestion = () => {
  const nextIndex = crrIndex + 1;
  if (nextIndex < quizData.length) {
    // 1. Stop current question timer
    handlestopTimer(crrIndex);

    // 2. Move next
    dispatch(setIncrementCrrIndex());
    dispatch(setIsAskAi(false));

    // 3. Start/resume timer for next
    if (!questionInterval[nextIndex]) {
      handlestartTimer(nextIndex);
    }
  } else {
    dispatch(setisModal(true));
    console.log("No more questions");
    console.log("Total Score - ", score);
  }
};

// PrevQuestionFunc
const PrevQuestion = () => {
  if (crrIndex === 0) {
    console.log("First Question");
    return;
  }

  // target index
  const prevIndex = crrIndex - 1;

  // 1) stop the current question's timer
  handlestopTimer(crrIndex);

  // 2) move to the previous question
  dispatch(setDecrementCrrIndex());

  // 3) start/resume the previous question's timer
  if (!questionInterval[prevIndex]) {
    handlestartTimer(prevIndex);
  }
};

// findQuestionWithIndexFunc
const findQuestionWithIndex = (index) => {
  // 1. Stop current timer
  handlestopTimer(crrIndex);

  // 2. Move to clicked question
  dispatch(setCrrIndex(index));

  // 3. Resume/start that question timer
  if (!questionInterval[index]) {
    handlestartTimer(index);
  }
};




  return (
    <>
      {/* Main Div */}
      <div className=' min-w-[300px] w-screen min-h-screen  flex px-4 bg-gray-900'>
        <div className="quizSection  w-full  sm:w-1/1  ">
          <h1 className='text-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text  font-extrabold font-sans py-3'>TriviaQuiz</h1>
          <div className="back  py-2">
            <button onClick={backToHome} className='flex justify-center items-center gap-2 bg-black hover:bg-gray-800 transition-all duration-300 border border-gray-700 rounded-lg px-3 py-3 cursor-pointer text-gray-200 hover:text-blue-400 '>
              &larr; Back to Home
            </button>
          </div>

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
            <div className="quizBox w-full mb-2 md:w-[75%] border border-blue-950 rounded-lg overflow-hidden p-2 text-gray-200 ">

              {/* information */}
              <div className=' flex justify-between items-center '>
                <h1 className=' w-fit px-3 py-2 text-[13px] md:text-[15px] md:px-6 md:py-1 rounded-lg bg-gray-800 '><span>Q{crrIndex + 1}.</span> {Question.category}</h1>
                <h1 className=' w-fit px-3 py-2 text-[13px] md:text-[15px] md:px-6 md:py-1 rounded-lg bg-gray-800 capitalize'><span>difficulty : </span >{Question.difficulty}</h1>
              </div>

              {/* Question */}
              <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center  py-2 px-2 mt-4 gap-3">
                {/* Question text */}
                <p className="flex-1 text-base sm:text-lg md:text-[22px] text-gray-300 font-bold px-4 break-words">
                  {Question.question}
                </p>

                {/* Timer */}
                <div className="sm:ml-auto flex justify-center items-center gap-2 px-3 sm:px-4 border border-gray-300 rounded-md py-1 sm:py-2">
                  <h1 className="text-xs sm:text-sm md:text-base">
                    {formatTime(questionTimer[crrIndex] || 1)}
                  </h1>
                </div>
              </div>

              {/*Options */}
              <div className="options mt-3">
                <ul className='p-3'>
                  {
                    suffleOptions.map((choice, id) => {
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
            <div className="md:w-[25%] border text-gray-200  px-4 py-3 border-blue-950 rounded-lg overflow-hidden">

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
                      <h1>{progress.toFixed(2)}%</h1>
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
              {isAskAI && (
                <div className="progressBar border mb-3 border-purple-700 bg-gradient-to-r from-pink-800 via-purple-800 to-blue-800 rounded-xl p-2 transition-opacity duration-300">
                  <h1 className="flex justify-center items-center text-3xl font-sans">Ask With AI</h1>
                  <p className="flex justify-center items-center text-gray-300 text-sm py-2">
                    Search with LuminaAI
                  </p>
                  <div className="flex justify-center py-1 items-center">
                    <button
                      onClick={() => askForAi()}
                      className="bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 hover:scale-105 transition-all duration-300 cursor-pointer text-2xl rounded-md px-4 py-2"
                    >
                      <h1 className="text-gray-100">LuminaAI</h1>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAiBot && (
        <div className="fixed bottom-5 right-5 w-96 rounded-xl  p-3 z-50">
          <LuminaAiChatBot />
        </div>
      )}
      {
        isModal && (
          <SubmitModalCard
            submitQuiz={() => dispatch(setIsSubmitQuiz(true))}
            closeModal={() => dispatch(setisModal(false))}
          />
        )
      }
      {
        cancelQuizModal && (
          <CancelModalCard
            submitQuiz={() => dispatch(backToMainMenu())}
            closeModal={() => dispatch(setcancelQuizModal(false))}
          />
        )
      }
    </>
  )
}

export default QuizzCard