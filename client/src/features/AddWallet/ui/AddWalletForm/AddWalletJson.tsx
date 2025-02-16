'use client'
import { memo } from 'react'

import { Alert, Form } from 'react-bootstrap'

import { getError } from '@/shared/api/getError'
import { classNames } from '@/shared/lib/classNames/classNames'

import { useUploadPrivateKeysJson } from '../../model/hooks/useUploadPrivateKeysJson'

interface AddWalletFormProps {
    className?: string
    onClose: () => void
}

export const AddWalletJson = memo((props: AddWalletFormProps) => {
    const { className, onClose } = props

    const { uploadKeys, error: errorJson } = useUploadPrivateKeysJson(onClose)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        uploadKeys(file)
    }

    const errorMessageText = getError(errorJson)

    return (
        <div className={classNames('', {}, [className])}>
            <Form.Group controlId="jsonFile" className="mb-3">
                <Form.Label>Import JSON File</Form.Label>
                <Form.Control
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                />
            </Form.Group>

            {errorJson && (
                <Alert className="mt-3" variant="danger">
                    Error: {errorMessageText}
                </Alert>
            )}
        </div>
    )
})
AddWalletJson.displayName = 'AddWalletJson'
