import { useState, useCallback } from 'react'

export const useModal = () => {
    const [showModal, setShowModal] = useState(false)

    const handleShow = useCallback(() => setShowModal(true), [])
    const handleClose = useCallback(() => setShowModal(false), [])

    return [{ showModal, handleShow, handleClose }]
}
