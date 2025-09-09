import React, { useContext, useState } from 'react'
import { quizDataContext } from '../ContextApi'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuiz, backToMainMenu, resetTimer } from '../features/quizz/quizzSlice'
const SubmitQuiz = () => {

    const { quizData, questionTimer, crrIndex, correctAnswer, incorrectAnswer, isSubmitQuiz, isQuizStart, isLoading, answerStatus, userAnswers } = useSelector(s => s.quiz)
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch()

    const totalQuestions = quizData.length;
    const correctAnswers = answerStatus.filter(status => status === 'correct').length;
    const incorrectAnswers = answerStatus.filter(status => status === 'incorrect').length;
    const skippedAnswers = answerStatus.filter(status => status === 'skipped').length;
    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);

    const totalTime = Object.values(questionTimer).reduce((sum, time) => sum + (time || 0), 0);
    const averageTime = (totalTime / totalQuestions).toFixed(1);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${ mins }m ${ secs } s`;
    };

    const getPerformanceColor = (accuracy) => {
        if (accuracy >= 80) return 'text-green-600';
        if (accuracy >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen min-w-[280px] w-[800px] max-w-[850px]  flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4">
                        Quiz Results
                    </h1>
                    <div className={`text-6xl font-bold ${getPerformanceColor(accuracy)}`}>
                    {accuracy}%
                </div>
                <p className="text-gray-300 mt-2">Overall Accuracy</p>
            </div>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 ">
                <div className="bg-green-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-500">{correctAnswers}</div>
                    <div className="text-sm font-semibold text-green-600">Correct</div>
                </div>
                <div className="bg-red-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
                    <div className="text-sm font-semibold text-red-700">Incorrect</div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{skippedAnswers}</div>
                    <div className="text-sm font-semibold  text-yellow-700">Skipped</div>
                </div>
                {/* <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatTime(totalTime)}</div>
                    <div className="text-sm text-blue-700">Total Time</div>
                </div> */}
            </div>

            {/* Detailed Review Toggle */}
            <div className="text-center mb-6">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="bg-gray-100 cursor-pointer hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    {showDetails ? 'Hide' : 'Show'} Detailed Review
                </button>
            </div>

            {/* Detailed Answer Review */}
            {showDetails && (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {quizData.map((question, index) => (
                        <div key={index} className="border bg-gray-800 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                                <span className="text-sm font-medium text-gray-400">
                                    Question {index + 1}
                                </span>
                                <div className="flex items-center space-x-2">
                                    {/* <span className="text-xs text-gray-300">
                                        Time: {formatTime(questionTimer[index] || 0)}
                                    </span> */}
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${answerStatus[index] === 'correct'
                                            ? 'bg-green-100 text-green-800'
                                            : answerStatus[index] === 'incorrect'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {answerStatus[index] || 'skipped'}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-2">{question.question}</p>
                            <div className="space-y-1">
                                <p className="text-sm">
                                    <span className="font-medium text-gray-300">Your Answer:</span>
                                    <span className={`ml-1 ${userAnswers[index] === question.correct_answer
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                        }`}>
                                        {userAnswers[index] || 'Not answered'}
                                    </span>
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium text-gray-300">Correct Answer:</span>
                                    <span className="ml-1 text-green-600">
                                        {question.correct_answer}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                <button
                    onClick={() => dispatch(resetQuiz())}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Retake Quiz
                </button>
                <button
                    onClick={() => dispatch(backToMainMenu())}
                    className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    New Quiz
                </button>
            </div>
        </div>
      </div >
    )
}

export default SubmitQuiz
