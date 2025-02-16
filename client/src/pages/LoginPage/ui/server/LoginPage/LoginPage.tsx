import { Container } from 'react-bootstrap'

import { LoginForm } from '@/features/AuthorizationForm'

import cls from './LoginPage.module.scss'

const LoginPage = () => {
    return (
        <Container className={cls.loginPage}>
            <LoginForm />
        </Container>
    )
}

export default LoginPage
