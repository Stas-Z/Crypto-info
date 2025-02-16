'use client'

import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

// eslint-disable-next-line
import { getUserAuthData } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { children } = props
    const router = useRouter()
    const isAuth = useSelector(getUserAuthData)

    useEffect(() => {
        const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)

        if (!token) {
            router.push('/login')
        }
    }, [router, isAuth])

    return <>{children}</>
}
