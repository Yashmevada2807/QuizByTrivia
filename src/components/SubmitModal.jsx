import React, { useContext, useState } from 'react'
import SubmitModalCard from './SubmitModalCard'
import { quizDataContext } from '../ContextApi'
import { setIsSubmitQuiz } from '../features/quizz/quizzSlice'

const SubmitModal = () => {

    const closeModal = () => {
        setIsSubmitQuiz(false)
    }

    const submitQuiz = () => {
        
    }

    return (
        <>
        <SubmitModalCard submitQuiz={submitQuiz} closeModal={closeModal} />
        </>
    )
}

export default SubmitModal
