import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Address.module.scss'
import { PublicAddress } from '../../model/types/address'

interface AddressProps {
    className?: string
    address: PublicAddress
}

export const Address = memo((props: AddressProps) => {
    const { className, address } = props

    return (
        <option
            className={classNames(cls.address, {}, [className])}
            value={address.address}
        >
            {address.address}
        </option>
    )
})
Address.displayName = 'Address'
