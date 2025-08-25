import React, { useEffect } from 'react'
import { fetchedQuizData, setFormData } from '../features/quizz/quizzSlice'
import { useDispatch, useSelector } from 'react-redux'

const UserChoice = () => {

    const { quizData, isLoading, status, formData, isQuizStart, } = useSelector(s => s.quiz)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Data - ', quizData);
        console.log('Status - ', status)
        console.log('Loading - ', isLoading)
        console.log('QuizStarted - ', isQuizStart);
    }, [quizData, isLoading, status, isQuizStart])
    
    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(setFormData({ name, value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchedQuizData({ amount: formData.amount, type: formData.type, difficulty: formData.difficulty }))
    }

    return (
        <div className=' min-w-[300px] w-[700px] max-w-[780px] rounded-lg px-4 py-4 bg-gray-800'>
            <h1 className='px-5 flex justify-center py-4 text-white items-center text-2xl font-semibold'> Welcome to TriviaQuizz</h1>
            {/* SubmitQuizDataForm */}
            <form onSubmit={handleSubmit} className='w-full py-6'>
                {/* QuestionsSelectionSection */}
                <section className=' py-5'>
                    <label className='text-2xl text-gray-300 w-full py-2' >Select Amount Of Question's</label>
                    <br />
                    <select
                        className=' bg-gray-600 text-gray-400 px-2 w-full mt-4 py-3 rounded-lg'
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                </section>
                {/* DifficultySelectionSection */}
                <section className=' py-5'>
                    <label className='text-2xl text-gray-300 w-full py-2' >Select Difficulty</label>
                    <br />
                    <select
                        className=' bg-gray-600 text-gray-400 px-2 w-full mt-4 py-3 rounded-lg'
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        {/* <option value="anytype">Any Difficulty</option> */}
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>

                    </select>
                </section>
                {/* TypeSelectionSection */}
                <section className=' py-5'>
                    <label className='text-2xl text-gray-300 w-full py-2' >Select Type</label>
                    <br />
                    <select
                        className=' bg-gray-600 text-gray-400 px-2 w-full mt-4 py-3 rounded-lg'
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        {/* <option value="anytype">Any Type</option> */}
                        <option value="multiple">Multiple</option>
                        <option value="boolean">True/False</option>
                    </select>
                </section>
                {/* SubmitBtn */}
                <div className=' flex justify-center items-center p-3'>
                    <button type='submit' className=' px-6 py-3 cursor-pointer text-white text-lg font-semibold bg-orange-500 rounded-2xl'>
                        {
                            isLoading ? <span className='text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-center dark:focus:ring-blue-800 inline-flex items-center'>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Loading...</span> : <span>Get Started</span>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserChoice
