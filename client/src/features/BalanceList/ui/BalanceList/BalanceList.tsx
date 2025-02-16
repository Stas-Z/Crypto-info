'use client'
import { memo } from 'react'

import { Card, ListGroup, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getCurrentAddress } from '@/entities/Address'
import { Balance } from '@/entities/Balance'
// eslint-disable-next-line
import { getSelectedTokens } from '@/features/TokenList'
import { classNames } from '@/shared/lib/classNames/classNames'

import { useGetBalanceQuery } from '../../api/balanceApi'

interface BalanceProps {
    className?: string
}

export const BalanceList = memo((props: BalanceProps) => {
    const { className } = props
    const tokens = useSelector(getSelectedTokens)
    const address = useSelector(getCurrentAddress)

    const { data, error, isLoading } = useGetBalanceQuery(
        { address, tokens },
        { skip: !address },
    )

    if (isLoading) {
        return <Spinner animation="border" />
    }

    if (error) {
        return null
    }

    return (
        <div className={classNames('', {}, [className])}>
            {data && (
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {data.map((balance) => (
                                <Balance balance={balance} key={balance.name} />
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
})
BalanceList.displayName = 'BalanceList'
