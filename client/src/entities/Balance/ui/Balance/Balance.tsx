import { memo } from 'react'

import { ListGroup } from 'react-bootstrap'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Balance.module.scss'
import { IBalance } from '../../model/types/balance'

interface BalanceProps {
    className?: string
    balance: IBalance
}

export const Balance = memo((props: BalanceProps) => {
    const { className, balance } = props

    return (
        <div className={classNames(cls.balance, {}, [className])}>
            <ListGroup.Item className={cls.balanceItem}>
                <span className={cls.tokenName}>{balance.name}</span>
                <div className={cls.balanceDetails}>
                    <div className={cls.usdBalance}>
                        {Number(balance.balanceInUSD).toLocaleString('ru-RU', {
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
        </div>
    )
})
Balance.displayName = 'Balance'
