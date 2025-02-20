'use client'
import { ChangeEvent, memo } from 'react'

import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { addressActions, getCurrentAddress } from '@/entities/Address'
import { Address } from '@/entities/Address'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import { useGetAddressesQuery } from '../../api/addressApi'

export const AddressList = memo(() => {
    const dispatch = useAppDispatch()
    const selectedAddress = useSelector(getCurrentAddress)
    const { data: addresses, isLoading, isError } = useGetAddressesQuery()

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        dispatch(addressActions.setCurrentAddress(event.target.value))
    }

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading addresses</p>

    return (
        <Form.Group controlId="addressSelect">
            <Form.Label>Выберете Адрес</Form.Label>
            <Form.Control
                as="select"
                value={selectedAddress}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Select an address
                </option>
                {addresses &&
                    addresses.map((address) => (
                        <Address address={address} key={address._id} />
                    ))}
            </Form.Control>
        </Form.Group>
    )
})

AddressList.displayName = 'AddressList'
