import { Container } from 'react-bootstrap'

import { AddressList } from '@/features/AddressList'
import { BalanceList } from '@/features/BalanceList'
import { ExitButton } from '@/features/ExitButton'
import { TokenSelector } from '@/features/TokenList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ProtectedRoute } from '@/shared/lib/components/ProtectedRoute/ProtectedRoute'
import { AddWalletModal } from '@/widgets/AddWalletModal'

import cls from './MainPage.module.scss'

interface MainPageProps {
    className?: string
}

const MainPage = (props: MainPageProps) => {
    const { className } = props
    return (
        <Container className={classNames(cls.mainPage, {}, [className])}>
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
