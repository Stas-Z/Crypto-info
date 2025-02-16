import { Container } from 'react-bootstrap'

import { AddressList } from '@/features/AddressList'
import { BalanceList } from '@/features/BalanceList'
import { ExitButton } from '@/features/ExitButton'
import { TokenSelector } from '@/features/TokenList'
import { ProtectedRoute } from '@/shared/lib/components/ProtectedRoute/ProtectedRoute'
import { AddWalletModal } from '@/widgets/AddWalletModal'

import cls from './MainPage.module.scss'

const MainPage = () => {
    return (
        <Container className={cls.mainPage}>
            <ProtectedRoute>
                <div className={cls.header}>
                    <AddWalletModal />
                    <ExitButton />
                </div>
                <AddressList />
                <TokenSelector />
                <BalanceList />
            </ProtectedRoute>
        </Container>
    )
}

export default MainPage
