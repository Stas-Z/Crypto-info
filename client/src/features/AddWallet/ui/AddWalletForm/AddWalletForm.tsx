'use client'
import { memo, useCallback } from 'react'

import { Alert, Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getError } from '@/shared/api/getError'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import { useAddAddressesMutation } from '../../api/walletsApi'
import { getPrivateKey } from '../../model/selectors/getAddWalletSelector/getAddWalletSelector'
import { addWalletActions } from '../../model/slice/walletSlice'

interface AddWalletFormProps {
    className?: string
}

export const AddWalletForm = memo((props: AddWalletFormProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

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

    const errorMessageText = getError(error)

    return (
        <div className={classNames('', {}, [className])}>
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

            {error && (
                <Alert className="mt-3" variant="danger">
                    Error: {errorMessageText}
                </Alert>
            )}
        </div>
    )
})
AddWalletForm.displayName = 'AddWalletForm'
