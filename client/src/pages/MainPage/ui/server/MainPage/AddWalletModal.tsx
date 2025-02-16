'use client'

import { useState, useCallback, memo } from 'react'

import { Button, Modal } from 'react-bootstrap'

import { AddWalletForm } from '@/features/AddWallet'

interface AddWalletModalProps {
    className?: string
}

export const AddWalletModal = memo((props: AddWalletModalProps) => {
    const { className } = props
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = useCallback(() => setShowModal(true), [])
    const handleCloseModal = useCallback(() => setShowModal(false), [])

    return (
        <div>
            <Button variant="primary" onClick={handleShowModal}>
                Добавить кошелек
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить кошелек</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddWalletForm />
                </Modal.Body>
            </Modal>
        </div>
    )
})

AddWalletModal.displayName = 'AddWalletModal'
