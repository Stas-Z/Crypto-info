import { Container } from 'react-bootstrap'

import { Balance } from '@/features/AddWallet'
import { TokenSelector } from '@/features/AddWallet'
import { AddressListSelect } from '@/features/AddWallet'
import { classNames } from '@/shared/lib/classNames/classNames'
import ProtectedRoute from '@/shared/lib/components/ProtectedRoute/ProtectedRoute'

import { AddWalletModal } from './AddWalletModal'
import cls from './MainPage.module.scss'

interface MainPageProps {
    className?: string
}

const MainPage = (props: MainPageProps) => {
    const { className } = props

    return (
        <Container className={classNames(cls.mainPage, {}, [className])}>
            <ProtectedRoute>
                <AddWalletModal />
                <AddressListSelect />

                <TokenSelector />
                <Balance />
            </ProtectedRoute>
        </Container>
    )
}

export default MainPage
