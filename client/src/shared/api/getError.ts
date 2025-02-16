import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function getError(
    error: FetchBaseQueryError | SerializedError | undefined,
) {
    if (error) {
        if ('data' in error) {
            return (error.data as { message?: string }).message || ''
        }
        if ('message' in error) {
            return error.message
        }
        if ('status' in error) {
            return 'Нет связи с сервером'
        }
    }
    return ''
}
