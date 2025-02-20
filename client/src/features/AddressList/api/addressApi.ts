import { addressActions, PublicAddress } from '@/entities/Address'
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
            onQueryStarted: async (_, thunkAPI) => {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled

                    if (data.length > 0) {
                        dispatch(
                            addressActions.setCurrentAddress(data[0].address),
                        )
                    }
                } catch (err) {
                    console.error('Error adding wallets:', err)
                }
            },
        }),
    }),
})

export const { useGetAddressesQuery } = addressApi
