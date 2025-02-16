'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)

        if (!token) {
            router.push('/login')
        }
    }, [router])

    return <>{children}</>
}
