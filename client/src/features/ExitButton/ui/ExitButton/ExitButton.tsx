'use client'
import { memo, useCallback } from 'react'

import { Button } from 'react-bootstrap'

import { userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ExitButtonProps {
    className?: string
}

export const ExitButton = memo((props: ExitButtonProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

    const onClickExit = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    return (
        <div className={classNames('ExitButton', {}, [className])}>
            <Button variant="dark" onClick={onClickExit}>
                Выход
            </Button>
        </div>
    )
})
ExitButton.displayName = 'ExitButton'
