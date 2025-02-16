'use client'

import { useState, useCallback, memo } from 'react'

import { Button, Modal } from 'react-bootstrap'

import { AddWalletForm, addWalletReducer } from '@/features/AddWallet'
import { AddWalletJson } from '@/features/AddWallet'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const initialReducers: ReducersList = {
    addWallet: addWalletReducer,
}

export const AddWalletModal = memo(() => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = useCallback(() => setShowModal(true), [])
    const handleCloseModal = useCallback(() => setShowModal(false), [])

    return (
        <DynamicModuleLoader reducers={initialReducers}>
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
                        <hr />
                        <AddWalletJson />
                    </Modal.Body>
                </Modal>
            </div>
        </DynamicModuleLoader>
    )
})

AddWalletModal.displayName = 'AddWalletModal'
