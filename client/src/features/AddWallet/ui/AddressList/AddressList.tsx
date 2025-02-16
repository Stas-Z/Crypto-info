'use client'
import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './AddressList.module.scss'
import { useGetAddressesQuery } from '../../model/api/walletsApi'

interface AddressListProps {
    className?: string
}

export const AddressList = memo((props: AddressListProps) => {
    const { className } = props

    const { data: addresses, isLoading, isError } = useGetAddressesQuery()

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading addresses</p>

    return (
        <div className={classNames(cls.addressList, {}, [className])}>
            <ul>
                {addresses &&
                    addresses?.map((item) => (
                        <li key={item._id}>{item.address}</li>
                    ))}
            </ul>
        </div>
    )
})
AddressList.displayName = 'AddressList'
