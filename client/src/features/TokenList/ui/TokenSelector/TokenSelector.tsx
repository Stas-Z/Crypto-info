'use client'
import { memo, useCallback } from 'react'

import { Alert, Spinner, Card, Row } from 'react-bootstrap'

import { Token } from '@/entities/Token'
import { classNames } from '@/shared/lib/classNames/classNames'

import { useGetTokensQuery, useUpdateTokenMutation } from '../../api/tokenApi'

interface TokenSelectorProps {
    className?: string
}

export const TokenSelector = memo((props: TokenSelectorProps) => {
    const { className } = props

    const { data: tokens, isLoading, isError } = useGetTokensQuery()
    const [updateToken] = useUpdateTokenMutation()

    const onClickSelectTokens = useCallback(
        (symbol: string) => {
            updateToken(symbol)
        },
        [updateToken],
    )

    if (isLoading) return <Spinner animation="border" />
    if (isError) return <Alert variant="danger">Ошибка загрузки токенов</Alert>

    return (
        <div className={classNames('', {}, [className])}>
            <Card.Text>Выберите Токены</Card.Text>
            <Row className="g-4">
                {tokens?.map((token) => (
                    <Token
                        onClick={onClickSelectTokens}
                        token={token}
                        key={token.symbol}
                    />
                ))}
            </Row>
        </div>
    )
})
TokenSelector.displayName = 'TokenSelector'
