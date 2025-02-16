import { PublicAddress } from '@/entities/Address'
import { rtkApi } from '@/shared/api/rtkApi'

export const addressApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getAddresses: builder.query<PublicAddress[], void>({
            query: () => {
                return {
                    url: 'public-address',
                    method: 'GET',
                }
            },
        }),
    }),
})

export const { useGetAddressesQuery } = addressApi
