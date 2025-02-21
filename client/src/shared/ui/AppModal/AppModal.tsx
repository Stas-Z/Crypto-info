'use client'

import { memo, ReactNode } from 'react'

import { Modal } from 'react-bootstrap'

interface AppModalProps {
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    title?: string
}

export const AppModal = memo((props: AppModalProps) => {
    const { children, title, isOpen, onClose } = props

    return (
        <div>
            <Modal show={isOpen} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </div>
    )
})

AppModal.displayName = 'AppModal'
