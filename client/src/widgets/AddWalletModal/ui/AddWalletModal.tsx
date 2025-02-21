'use client'

import { memo } from 'react'

import { Button } from 'react-bootstrap'

import {
    AddWalletForm,
    addWalletReducer,
    AddWalletSeed,
} from '@/features/AddWallet'
import { AddWalletJson } from '@/features/AddWallet'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { AppModal } from '@/shared/ui/AppModal/AppModal'

import cls from './AddWalletModal.module.scss'

const initialReducers: ReducersList = {
    addWallet: addWalletReducer,
}

export const AddWalletModal = memo(() => {
    const [modalForm] = useModal()
    const [modalSeed] = useModal()

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={cls.modal}>
                <Button variant="primary" onClick={modalForm.handleShow}>
                    Добавить кошелек
                </Button>
                <Button variant="primary" onClick={modalSeed.handleShow}>
                    Ввести сид-фразу
                </Button>

                <AppModal
                    title="Добавить кошелек"
                    isOpen={modalForm.showModal}
                    onClose={modalForm.handleClose}
                >
                    <AddWalletForm onClose={modalForm.handleClose} />
                    <hr />
                    <AddWalletJson onClose={modalForm.handleClose} />
                </AppModal>
                <AppModal
                    title="Введите Сид-фразу"
                    isOpen={modalSeed.showModal}
                    onClose={modalSeed.handleClose}
                >
                    <AddWalletSeed onClose={modalSeed.handleClose} />
                </AppModal>
            </div>
        </DynamicModuleLoader>
    )
})

AddWalletModal.displayName = 'AddWalletModal'
