'use client'
import { memo, useCallback } from 'react'

import { Alert, Spinner, Card, Row, Col } from 'react-bootstrap'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './TokenSelector.module.scss'
import {
    useGetTokensQuery,
    useUpdateTokenMutation,
} from '../../model/api/walletsApi'

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
        <div className={classNames(cls.tokenSelector, {}, [className])}>
            <Card.Text>Выберите Токены</Card.Text>
            <Row className="g-4">
                {tokens?.map((token) => (
                    <Col key={token.symbol} xs={6} md={3} lg={2}>
                        <Card
                            className={classNames(
                                cls.tokenCard,
                                { [cls.grayscale]: !token.selected },
                                [],
                            )}
                            onClick={() => onClickSelectTokens(token.symbol)}
                        >
                            <Card.Body>
                                <Card.Img
                                    variant="top"
                                    src={token.image}
                                    alt={token.symbol}
                                    className={cls.tokenImage}
                                />
                                <Card.Text>{token.symbol}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
})
TokenSelector.displayName = 'TokenSelector'
