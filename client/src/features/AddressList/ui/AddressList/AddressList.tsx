'use client'
import { ChangeEvent, memo } from 'react'

import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import {
    addressActions,
    addressReducer,
    getCurrentAddress,
} from '@/entities/Address'
import { Address } from '@/entities/Address'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import { useGetAddressesQuery } from '../../api/addressApi'

const initialReducers: ReducersList = {
    address: addressReducer,
}

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
        <DynamicModuleLoader reducers={initialReducers}>
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
        </DynamicModuleLoader>
    )
})

AddressList.displayName = 'AddressList'
