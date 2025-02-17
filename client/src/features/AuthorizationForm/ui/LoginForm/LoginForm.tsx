'use client'
import { memo, useCallback, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'
import { Form, Button, Container, Card, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getError } from '@/shared/api/getError'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './LoginForm.module.scss'
import { useAuthByMail, useRegByMail } from '../../model/api/userAuthApi'
import { AuthType, AuthTypes } from '../../model/consts/authConsts'
import {
    getAuthView,
    getEmail,
    getPassword,
} from '../../model/selectors/getLoginState/getLoginState'
import { regActions, regReducer } from '../../model/slice/regSlice'
import { AuthTypeTabs } from '../AuthTypeTabs/AuthTypeTabs'

export interface LoginFormProps {
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    authForm: regReducer,
}

export const LoginForm = memo((props: LoginFormProps) => {
    const { onSuccess } = props
    const router = useRouter()
    const dispatch = useAppDispatch()

    const password = useSelector(getPassword)
    const email = useSelector(getEmail)
    const view = useSelector(getAuthView)

    const [login, { isLoading, error: errorAuth }] = useAuthByMail()
    const [registration, { error: errorReg, data }] = useRegByMail()

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
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }, [email, login, onSuccess, password, router])

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

    const errorMessageText = getError(errorAuth || errorReg)
    const buttonText = view === AuthType.AUTH ? 'Войти' : 'Зарегистрировать'

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Container
                className={`${classNames(cls.loginForm, {}, [])} d-flex flex-column justify-content-center align-items-center `}
            >
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
                {isLoading && (
                    <Alert className="mt-5" variant="primary">
                        Ожидайте загрузку! Так как используется бесплатный
                        сервер, время первой загрузки может занять некоторое
                        время
                    </Alert>
                )}
            </Container>
        </DynamicModuleLoader>
    )
})
LoginForm.displayName = 'LoginForm'
