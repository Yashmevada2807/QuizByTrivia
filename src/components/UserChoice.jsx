import React, { useContext, useEffect } from 'react'
import { quizDataContext } from '../ContextApi'

const UserChoice = ({ onStart }) => {
    const { formData, setFormData, quizData, data, } = useContext(quizDataContext)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await data()
        setTimeout(() => {
        onStart()
        }, 1000)
        // navigate('/quiz')
    }

    useEffect(() => {
        // console.log(formData)
        // console.log('Api Data :', quizData)
    }, [formData, quizData])

    return (
        <div className=' min-w-[300px] w-[700px] max-w-[780px] rounded-lg px-4 py-4 bg-gray-700'>
            <h1 className='px-5 flex justify-center py-4 text-white items-center text-2xl font-semibold'> Welcome to TriviaQuizz</h1>
            <form className='w-full py-6' onSubmit={handleSubmit}>
                <section className=' py-5'>
                    <label className='text-2xl text-gray-200 w-full py-2' >Select Amount Of Question's</label>
                    <br />
                    <select
                        className=' bg-gray-200 px-2 w-full mt-4 py-3 rounded-lg'
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
                <section className=' py-5'>
                    <label className='text-2xl text-gray-200 w-full py-2' >Select Difficulty</label>
                    <br />
                    <select
                        className=' bg-gray-200 px-2 w-full mt-4 py-3 rounded-lg'
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
                <section className=' py-5'>
                    <label className='text-2xl text-gray-200 w-full py-2' >Select Type</label>
                    <br />
                    <select
                        className=' bg-gray-200 px-2 w-full mt-4 py-3 rounded-lg'
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
                <div className=' flex justify-center items-center p-3'>
                    <button type='submit' className=' px-6 py-3 cursor-pointer text-white text-lg font-semibold bg-orange-500 rounded-2xl'>
                        Get Started
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserChoice
