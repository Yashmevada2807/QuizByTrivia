import React, { useContext, useState } from 'react'
import SubmitModalCard from './SubmitModalCard'
import { quizDataContext } from '../ContextApi'

const SubmitModal = () => {

    const { isModal, setIsModal } = useContext(quizDataContext)

    const closeModal = () => {}

    const submitQuiz = () => {}

    return (
        <>
        <SubmitModalCard submitQuiz={submitQuiz} closeModal={closeModal} />
        </>
    )
}

export default SubmitModal
