'use client'
import { memo, useCallback } from 'react'

import { Alert, Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getError } from '@/shared/api/getError'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './AddWalletForm.module.scss'
import { useAddAddressesMutation } from '../../model/api/walletsApi'
import { useUploadPrivateKeysJson } from '../../model/hooks/useUploadPrivateKeysJson'
import { getPrivateKey } from '../../model/selectors/getAddWalletSelector/getAddWalletSelector'
import { addWalletActions } from '../../model/slice/walletSlice'

interface AddWalletFormProps {
    className?: string
}

// const initialReducers: ReducersList = {
//     addWallet: addWalletReducer,
// }

export const AddWalletForm = memo((props: AddWalletFormProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const { uploadKeys, error: errorJson } = useUploadPrivateKeysJson()

    const privateKey = useSelector(getPrivateKey)

    const [addAdresses, { error }] = useAddAddressesMutation()

    const onClickSubmit = useCallback(() => {
        addAdresses({ privateKeys: [privateKey] }).unwrap()
        dispatch(addWalletActions.setPrivateKey(''))
    }, [addAdresses, dispatch, privateKey])

    const onChangePrivateKey = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(addWalletActions.setPrivateKey(e.target.value))
        },
        [dispatch],
    )

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        uploadKeys(file)
    }

    const errorMessageText = getError(error || errorJson)

    return (
        <div className={classNames(cls.addWalletForm, {}, [className])}>
            <Form>
                <Form.Group className="mb-3" controlId="privateKey">
                    <Form.Label>Private Key</Form.Label>
                    <Form.Control
                        type="text"
                        value={privateKey}
                        onChange={onChangePrivateKey}
                        placeholder="Enter private key"
                    />
                </Form.Group>
                <Button variant="primary" onClick={onClickSubmit}>
                    Импортировать счет
                </Button>
            </Form>

            <hr />

            <Form.Group controlId="jsonFile" className="mb-3">
                <Form.Label>Import JSON File</Form.Label>
                <Form.Control
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                />
            </Form.Group>

            {(error || errorJson) && (
                <Alert className="mt-3" variant="danger">
                    Error: {errorMessageText}
                </Alert>
            )}
        </div>
    )
})
AddWalletForm.displayName = 'AddWalletForm'
