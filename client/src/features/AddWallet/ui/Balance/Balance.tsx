'use client'
import { memo } from 'react'

import { Card, ListGroup, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Balance.module.scss'
import { useGetBalanceQuery } from '../../model/api/walletsApi'
import {
    getCurrentAddress,
    getSelectedTokens,
} from '../../model/selectors/getAddWalletSelector/getAddWalletSelector'

interface BalanceProps {
    className?: string
}

export const Balance = memo((props: BalanceProps) => {
    const { className } = props
    const tokens = useSelector(getSelectedTokens)
    const address = useSelector(getCurrentAddress)

    const { data, error, isLoading } = useGetBalanceQuery({ address, tokens })

    if (isLoading) {
        return <Spinner animation="border" />
    }

    if (error) {
        return null
    }

    return (
        <div className={classNames(cls.balance, {}, [className])}>
            {data && (
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {data.map((balance) => (
                                <ListGroup.Item
                                    key={balance.name}
                                    className={cls.balanceItem}
                                >
                                    <span className={cls.tokenName}>
                                        {balance.name}
                                    </span>
                                    <div className={cls.balanceDetails}>
                                        <div className={cls.usdBalance}>
                                            {Number(
                                                balance.balanceInUSD,
                                            ).toLocaleString('ru-RU', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                            $
                                        </div>
                                        <div className={cls.cryptoBalance}>
                                            {balance.balance} {balance.name}
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
})
Balance.displayName = 'Balance'
