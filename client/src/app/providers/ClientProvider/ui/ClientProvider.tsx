'use client'

import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import { useInitAuthDataQuery } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { PageLoader } from '@/widgets/PageLoader'

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const isAuth = useSelector(getUserAuthData)

    const { isLoading, error } = useInitAuthDataQuery(undefined, {
        skip: !isAuth,
    })

    useEffect(() => {
        if (error) {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
            console.error('Ошибка загрузки пользователя', error)
        }
    }, [error, isAuth])

    if (isLoading) {
        return <PageLoader />
    }

    return <>{children}</>
}
