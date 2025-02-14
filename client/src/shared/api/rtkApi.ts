import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { __API__ } from '../config/env'

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        credentials: 'include',
    }),
    endpoints: (builder) => ({}),
})
