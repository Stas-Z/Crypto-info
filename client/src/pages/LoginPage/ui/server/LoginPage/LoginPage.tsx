import { memo } from 'react'

import { Container } from 'react-bootstrap'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './LoginPage.module.scss'

interface MainPageProps {
    className?: string
}

const LoginPage = (props: MainPageProps) => {
    const { className } = props

    return (
        <Container className={classNames(cls.loginPage, {}, [className])}>
            Login page
        </Container>
    )
}

export default memo(LoginPage)
