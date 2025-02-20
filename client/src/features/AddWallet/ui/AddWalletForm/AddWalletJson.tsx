'use client'
import { memo, useState, useCallback } from 'react'

import { Alert, Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getError } from '@/shared/api/getError'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import { useDecryptWalletMutation } from '../../api/walletsApi'
import { getPasswordKey } from '../../model/selectors/getAddWalletSelector/getAddWalletSelector'
import { addWalletActions } from '../../model/slice/walletSlice'

interface AddWalletJsonProps {
    className?: string
    onClose: () => void
}

export const AddWalletJson = memo((props: AddWalletJsonProps) => {
    const { className, onClose } = props
    const dispatch = useAppDispatch()

    const password = useSelector(getPasswordKey)

    const [file, setFile] = useState<File | null>(null)

    const onFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0]
            if (selectedFile) {
                setFile(selectedFile)
            }
        },
        [],
    )

    const onChangePassword = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(addWalletActions.setPasswordKey(e.target.value))
        },
        [dispatch],
    )

    const [loadJson, { error, isSuccess }] = useDecryptWalletMutation()

    const handleSubmit = useCallback(async () => {
        if (!file) {
            throw new Error('Please select a file.')
        }

        const reader = new FileReader()
        reader.onload = async () => {
            try {
                const encryptedJson = reader.result as string

                await loadJson({ encryptedJson, password }).unwrap()

                onClose()
            } catch (error) {
                console.log(error)
            }
        }

        reader.readAsText(file)
    }, [file, loadJson, onClose, password])

    const errorText = getError(error)

    return (
        <div className={classNames('', {}, [className])}>
            <Form.Group controlId="jsonFile" className="mb-3">
                <Form.Label>Импортировать зашифрованный файл JSON</Form.Label>
                <Form.Control
                    type="file"
                    accept=".json"
                    onChange={onFileChange}
                />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Введите пароль для расшифровки"
                />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
                Импортировать кошелёк
            </Button>

            {errorText && (
                <Alert className="mt-3" variant="danger">
                    Error: {errorText}
                </Alert>
            )}

            {isSuccess && (
                <Alert className="mt-3" variant="success">
                    {'Кошелек успешно импортирован и расшифрован!'}
                </Alert>
            )}
        </div>
    )
})

AddWalletJson.displayName = 'AddWalletJson'
