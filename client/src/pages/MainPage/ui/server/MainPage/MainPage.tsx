import { Container } from 'react-bootstrap'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './MainPage.module.scss'

interface MainPageProps {
    className?: string
}

const MainPage = (props: MainPageProps) => {
    const { className } = props

    return (
        <Container className={classNames(cls.mainPage, {}, [className])}>
            <div>Hello world</div>
        </Container>
    )
}

export default MainPage
