'use client'
import { ChangeEvent, memo } from 'react'

import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './AddressList.module.scss'
import { useGetAddressesQuery } from '../../model/api/walletsApi'
import { getCurrentAddress } from '../../model/selectors/getAddWalletSelector/getAddWalletSelector'
import { addWalletActions } from '../../model/slice/walletSlice'

interface AddressListProps {
    className?: string
}

export const AddressListSelect = memo((props: AddressListProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const selectedAddress = useSelector(getCurrentAddress)
    const { data: addresses, isLoading, isError } = useGetAddressesQuery()

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        dispatch(addWalletActions.setCurrentAddress(event.target.value))
    }

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading addresses</p>

    return (
        <div className={classNames(cls.addressList, {}, [className])}>
            <Form.Group controlId="addressSelect">
                <Form.Label>Выберете Адрес</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedAddress}
                    onChange={handleChange}
                    className={cls.addressSelect}
                >
                    <option value="" disabled>
                        Select an address
                    </option>
                    {addresses &&
                        addresses.map((item) => (
                            <option key={item._id} value={item.address}>
                                {item.address}
                            </option>
                        ))}
                </Form.Control>
            </Form.Group>
        </div>
    )
})

AddressListSelect.displayName = 'AddressListSelect'
