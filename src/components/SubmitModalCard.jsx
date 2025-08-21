import React from 'react'

const SubmitModalCard = ({ submitQuiz, closeModal }) => {
    return (
        <>
            <div onClick={closeModal} className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
                <div className='w-[500px] h-[300px] rounded-xl bg-gray-800 overflow-hidden'>
                    <div className="header w-full py-4 border-b border-gray-400">
                        <header className=' text-gray-200 text-3xl flex justify-center items-center'>Submit Quiz</header>
                    </div>
                    <div className="content ">
                        <p className='flex justify-center items-center my-10  py-4 text-2xl text-gray-200'>Are you sure you want to Submit ? </p>
                    </div>
                    <div className=' flex justify-evenly items-center py-4'>
                        <button className='px-5 py-2 cursor-pointer text-gray-200 text-xl rounded-md  bg-blue-600' onClick={submitQuiz}>Submit</button>
                        <button className='px-5 py-2 cursor-pointer text-gray-200 text-xl rounded-md  bg-red-500' onClick={closeModal}>cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitModalCard
