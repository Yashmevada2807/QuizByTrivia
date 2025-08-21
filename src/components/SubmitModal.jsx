import React, { useContext, useState } from 'react'
import SubmitModalCard from './SubmitModalCard'
import { quizDataContext } from '../ContextApi'

const SubmitModal = ({ onSubmit }) => {

    const { isModal, setIsModal } = useContext(quizDataContext)

    const closeModal = () => {
        console.log('you want to cancel');
        setIsModal(false)
    }

    const submitQuiz = () => {
        onSubmit()
        setIsModal(false)
    }

    return (
        <>
        { isModal && (
            <SubmitModalCard submitQuiz={submitQuiz} closeModal={closeModal} />
        )}
        </>
    )
}

export default SubmitModal
