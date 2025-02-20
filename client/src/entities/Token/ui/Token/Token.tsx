import { memo, useCallback } from 'react'

import { Card, Col } from 'react-bootstrap'

import { classNames } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/AppImage'

import cls from './Token.module.scss'
import { IToken } from '../../model/types/token'

interface TokenProps {
    className?: string
    token: IToken
    onClick: (symbol: string) => void
}

export const Token = memo((props: TokenProps) => {
    const { className, onClick, token } = props

    const onClickToken = useCallback(() => {
        onClick(token.symbol)
    }, [onClick, token.symbol])

    return (
        <Col
            xs={4}
            md={3}
            lg={2}
            className={classNames(cls.token, {}, [className])}
        >
            <Card
                className={classNames(
                    cls.tokenCard,
                    { [cls.grayscale]: !token.selected },
                    [],
                )}
                onClick={onClickToken}
            >
                <Card.Body>
                    <AppImage
                        className={cls.tokenImage}
                        src={token.image}
                        alt={token.symbol}
                        width={60}
                        height={60}
                        fallbackImage="/img/dafult_token.png"
                    />

                    <Card.Text>{token.symbol}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
})
Token.displayName = 'Token'
