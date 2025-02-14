'use client'
import { memo, useCallback, useEffect, useRef } from 'react'

import { Form, Button, Container, Card, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './LoginForm.module.scss'
import { useAuthByMail, useRegByMail } from '../../model/api/userAuthApi'
import { AuthType, AuthTypes } from '../../model/consts/authConsts'
import {
    getAuthView,
    getEmail,
    getPassword,
} from '../../model/selectors/getLoginState/getLoginState'
import { regActions } from '../../model/slice/regSlice'
import { AuthTypeTabs } from '../AuthTypeTabs/AuthTypeTabs'

export interface LoginFormProps {
    onSuccess?: () => void
}

const LoginForm = (props: LoginFormProps) => {
    const { onSuccess } = props

    const dispatch = useAppDispatch()

    const password = useSelector(getPassword)
    const email = useSelector(getEmail)
    const view = useSelector(getAuthView)

    const [login, { isLoading, error: errorAuth }] = useAuthByMail()
    const [registration, { error: errorReg, data }] = useRegByMail()

    console.log('data', data)

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const onChangeEmail = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(regActions.setUsername(e.target.value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(regActions.setPassword(e.target.value))
        },
        [dispatch],
    )

    const loginHandler = useCallback(async () => {
        try {
            await login({ email, password }).unwrap()
            onSuccess?.()
        } catch (error) {
            console.log(error)
        }
    }, [email, login, onSuccess, password])

    const onButtonClickHandler = useCallback(async () => {
        if (view === AuthType.REG) {
            try {
                await registration({ email, password }).unwrap()
                timerRef.current = setTimeout(() => {
                    loginHandler()
                }, 1000)
            } catch (error) {
                console.log(error)
            }
        }
        if (view === AuthType.AUTH) {
            loginHandler()
        }
    }, [email, loginHandler, password, registration, view])

    const onChangeHandler = (view: AuthTypes) => {
        dispatch(regActions.setView(view))
    }

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onButtonClickHandler()
            }
        },
        [onButtonClickHandler],
    )
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    function getError() {
        const error = errorAuth || errorReg
        if (error) {
            if ('data' in error) {
                return (error.data as { message?: string }).message || ''
            }
            if ('status' in error) {
                return 'Нет связи с сервером'
            }
        }
        return ''
    }

    const errorMessageText = getError()
    const buttonText = view === AuthType.AUTH ? 'Войти' : 'Зарегистрировать'

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className={cls.card}>
                <AuthTypeTabs onChangeType={onChangeHandler} />
                {errorMessageText && (
                    <Alert variant="danger">{errorMessageText}</Alert>
                )}
                {data && (
                    <Alert variant="primary">
                        Вы успешно зарегистрировались
                    </Alert>
                )}
                <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            placeholder="Введите email"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        onClick={onButtonClickHandler}
                        disabled={isLoading}
                        className="w-100 mt-3"
                    >
                        {buttonText}
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}
export default memo(LoginForm)
