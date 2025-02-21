'use client'
import { memo, useState, useCallback, ClipboardEvent } from 'react'

import { Alert, Button, Form } from 'react-bootstrap'

import { getError } from '@/shared/api/getError'
import { classNames } from '@/shared/lib/classNames/classNames'

import { useGetAddressesFromSeedMutation } from '../../api/walletsApi'

interface AddWalletSeedProps {
    className?: string
    onClose: () => void
}

export const AddWalletSeed = memo((props: AddWalletSeedProps) => {
    const { className, onClose } = props

    const [loadSeedFraze, { error: errorSeed }] =
        useGetAddressesFromSeedMutation()

    const [seedFraze, setSeedFraze] = useState<string[]>(Array(12).fill(''))
    const [error, setError] = useState<string | null>(null)

    const handleWordChange = useCallback(
        (index: number, value: string) => {
            const newseedFraze = [...seedFraze]
            newseedFraze[index] = value.trim()
            setSeedFraze(newseedFraze)
        },
        [seedFraze],
    )

    const handlePaste = useCallback(
        (
            e: ClipboardEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >,
        ) => {
            const pastedText = e.clipboardData.getData('Text').trim()

            const words = pastedText.split(' ').map((word) => word.trim())
            if (words.length === 12) {
                setSeedFraze(words)
            }
        },
        [],
    )

    const handlePasteFromClipboard = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText()
            const words = text
                .trim()
                .split(' ')
                .map((word) => word.trim())

            if (words.length === 12) {
                setSeedFraze(words)
            } else {
                setError('Сид-фраза должна содержать 12 слов.')
            }
        } catch {
            setError('Не удалось получить данные из буфера обмена.')
        }
    }, [])

    const handleSubmit = useCallback(async () => {
        if (seedFraze.some((word) => word === '')) {
            setError('Please fill all 12 words in the phrase.')
            return
        }

        setError(null)
        await loadSeedFraze({ seedFraze: seedFraze.join(' ') }).unwrap()
        onClose()
    }, [loadSeedFraze, seedFraze, onClose])

    const errorText = getError(errorSeed)

    return (
        <div className={classNames('', {}, [className])}>
            <Form>
                <Form.Group className="mb-3">
                    <div className="d-flex flex-wrap justify-content-around">
                        {seedFraze.map((word, index) => (
                            <div className="me-2 mb-2 col-3" key={index}>
                                <Form.Control
                                    type="text"
                                    value={word}
                                    onChange={(e) =>
                                        handleWordChange(index, e.target.value)
                                    }
                                    onPaste={handlePaste}
                                    placeholder={`Слово ${index + 1}`}
                                    maxLength={15}
                                />
                            </div>
                        ))}
                    </div>
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                {errorText && <Alert variant="danger">{errorText}</Alert>}

                <div className="d-flex align-items-center justify-content-between gap-2 ">
                    <Button variant="dark" onClick={handlePasteFromClipboard}>
                        Ctrl + V
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Импортировать кошелек
                    </Button>
                </div>
            </Form>
        </div>
    )
})

AddWalletSeed.displayName = 'AddWalletSeed'
