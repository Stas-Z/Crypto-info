'use client'
import { memo, useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap'

import { useLogOutMutation, userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ExitButtonProps {
    className?: string
}

export const ExitButton = memo((props: ExitButtonProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [logOut] = useLogOutMutation()

    const onClickExit = useCallback(() => {
        dispatch(userActions.logout())
        logOut()
        router.push('/login')
    }, [dispatch, logOut, router])

    return (
        <div className={classNames('ExitButton', {}, [className])}>
            <Button variant="dark" onClick={onClickExit}>
                Выход
            </Button>
        </div>
    )
})
ExitButton.displayName = 'ExitButton'
