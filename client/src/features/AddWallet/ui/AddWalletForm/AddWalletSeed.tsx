'use client'
import { memo, useCallback, useState } from 'react'

import { Alert, Button, Form } from 'react-bootstrap'

import { getError } from '@/shared/api/getError'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import { useAddAddressesMutation } from '../../api/walletsApi'

interface AddWalletSeedProps {
    className?: string
    onClose: () => void
}

export const AddWalletSeed = memo((props: AddWalletSeedProps) => {
    const { className, onClose } = props
    const dispatch = useAppDispatch()

    const [mnemonic, setMnemonic] = useState('')
    const onChangeMnemonic = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMnemonic(e.target.value)
        },
        [],
    )
    const [addAdresses, { error }] = useAddAddressesMutation()

    const onClickSubmit = useCallback(() => {}, [])

    const errorMessageText = getError(error)

    return (
        <div className={classNames('', {}, [className])}>
            <Form>
                <Form.Group className="mb-3" controlId="mnemonic">
                    <Form.Label>Mnemonic Phrase</Form.Label>
                    <Form.Control
                        type="text"
                        value={mnemonic}
                        onChange={onChangeMnemonic}
                        placeholder="Enter mnemonic phrase"
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
AddWalletSeed.displayName = 'AddWalletSeed'
