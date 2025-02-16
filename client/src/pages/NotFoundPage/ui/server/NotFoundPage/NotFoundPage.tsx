import Link from 'next/link'

import cls from './NotFoundPage.module.scss'

const NotFoundPage = () => {
    return (
        <div className={cls.notFoundPage}>
            Страница не найдена
            <Link href="/">Return Home</Link>
        </div>
    )
}
export default NotFoundPage
