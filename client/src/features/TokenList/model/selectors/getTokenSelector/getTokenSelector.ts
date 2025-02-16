import { createSelector } from '@reduxjs/toolkit'

import { tokenApi } from '../../../api/tokenApi'

export const selectSelectedTokens = tokenApi.endpoints.getTokens.select()

export const getSelectedTokens = createSelector(
    selectSelectedTokens,
    (selectedTokensData) => {
        return selectedTokensData?.data?.filter((token) => token.selected) || []
    },
)
