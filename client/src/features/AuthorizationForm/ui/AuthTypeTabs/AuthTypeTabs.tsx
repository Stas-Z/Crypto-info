'use client'
import { ReactNode, memo, useCallback, useMemo, useState } from 'react'

import { Tab, Tabs } from 'react-bootstrap'

import { AuthType, AuthTypes } from '../../model/consts/authConsts'

export interface TabItem {
    value: string
    content: ReactNode
}

interface AuthTypeTabsProps {
    onChangeType: (type: AuthTypes) => void
}

export const AuthTypeTabs = memo((props: AuthTypeTabsProps) => {
    const { onChangeType } = props

    const typeTabs: TabItem[] = useMemo(
        () =>
            Object.values(AuthType).map((type) => ({
                value: type,
                content: type as ReactNode,
            })),
        [],
    )

    const [activeKey, setActiveKey] = useState<string>(typeTabs[0].value)

    const onTabClick = useCallback(
        (tab: string | null) => {
            if (tab) {
                setActiveKey(tab)
                onChangeType(tab as AuthTypes)
            }
        },
        [onChangeType],
    )

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={activeKey}
            onSelect={onTabClick}
            className="mb-3"
        >
            {typeTabs.map((tab) => (
                <Tab
                    key={tab.value}
                    eventKey={tab.value}
                    title={tab.content}
                ></Tab>
            ))}
        </Tabs>
    )
})

AuthTypeTabs.displayName = 'AuthTypeTabs'
