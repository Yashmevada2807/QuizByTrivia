import React, { useContext } from 'react'
import { quizDataContext } from '../ContextApi'

const SubmitQuiz = () => {

    const { quizData, score, wrongAnswer, correctAnswer, skipedAnswer, setIsQuizStart, setIsSubmitQuiz, setScore, setCorrectAnswer, setWrongAnswer, setSkipedAnswer, setUserAnswers, setCrrIndex, setAnswerStatus, setIsModal } = useContext(quizDataContext)

    const tryAgain = () => {
        setIsSubmitQuiz(false)
        setCrrIndex(0)
        setUserAnswers(Array(quizData.length).fill(null))
        setAnswerStatus([])
        setIsQuizStart(true)
        setIsModal(false)
        setScore(0)
        setCorrectAnswer(0)
        setWrongAnswer(0)
        setSkipedAnswer(0)
    }
    
    const backToMenu = () => {
        setIsSubmitQuiz(false)
        setCrrIndex(0)
        setUserAnswers(Array(quizData.length).fill(null))
        setAnswerStatus([])
        setIsQuizStart(false)
        setIsModal(false)
        setScore(0)
        setCorrectAnswer(0)
        setWrongAnswer(0)
        setSkipedAnswer(0)
    }


    return (
        <div className='w-[1020px] h-[690px] bg-gray-800'>
            <div className="heading w-full border border-b-gray-700 flex justify-center items-center">
                <header className=' py-4 '>
                    <h1 className='text-5xl text-orange-500 font-semibold font-sans'>Result</h1>
                </header>
            </div>
            <div className="scoreCard flex flex-col justify-center items-center my-4">
                <h1 className='flex justify-center items-center text-6xl text-gray-200 py-3'>Total Score</h1>
                <h1 className={` flex justify-center pt-9 items-center  text-4xl text-gray-200`}><span className={` mr-2`}>{score} </span> Out of {quizData.length}</h1>
                {
                    score < 4 ? (
                        <p className={`py-4 text-red-500 text-lg font-semibold`}>
                            You Fail in quiz. Better luck next time!!!
                        </p>
                    ) : (
                        <p className={`py-4 text-green-500 text-lg font-semibold`}>
                            Congratulations you passed the quiz !!!
                        </p>
                    )
                }
                <div className='rounded-2xl bg-gray-900 min-w-[200px] w-[600px] max-w-[1000px]  py-7 flex flex-col justify-start items-center'>
                    <h1 className='mb-2 px-2 py-1 text-lg text-green-500 font-semibold'>Correct Answers - <span>{correctAnswer}</span></h1>
                    <h1 className='mb-2 px-2 py-1 text-lg text-red-600 font-semibold'>Wrong Answers - <span>{wrongAnswer}</span></h1>
                    {/* <h1 className='mb-2 px-2 py-1 text-lg text-gray-400 font-semibold'>Skiped Answers - <span>{skipedAnswer}</span></h1> */}
                </div>
            </div>
            <div className="button w-full mt-20 flex justify-center items-center gap-4">
                <button onClick={tryAgain} className='px-8 py-3 bg-orange-700 rounded-lg text-gray-300 font-semibold hover:scale-105 hover:bg-amber-600 hover:text-gray-100 cursor-pointer transition-all duration-150'>TryAgain</button>
                <button onClick={backToMenu} className='px-8 py-3 bg-blue-700 rounded-lg text-gray-300 font-semibold hover:scale-105 hover:bg-blue-600 hover:text-gray-100 cursor-pointer transition-all duration-150'>Back To Main Menu</button>
            </div>
        </div>
    )
}

export default SubmitQuiz
