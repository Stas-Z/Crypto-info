'use client'

import { useEffect } from 'react'

import { useInitAuthData } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { PageLoader } from '@/widgets/PageLoader'

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const { isLoading, error } = useInitAuthData()

    useEffect(() => {
        if (error) {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
            console.error('Ошибка загрузки пользователя', error)
        }
    }, [error])

    if (isLoading) {
        return <PageLoader />
    }

    return <>{children}</>
}
