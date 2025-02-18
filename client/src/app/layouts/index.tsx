import type { Metadata } from 'next'

import '../styles/index.scss'
import { ClientProvider } from '../providers/ClientProvider/ui/ClientProvider'
import { StoreProvider } from '../providers/StoreProvider'

export const metadata: Metadata = {
    title: {
        template: '%s | Crypto Info',
        default: 'Crypto Info',
    },
    description: 'Crypto Info',
}

export function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <main className="app">
                    <StoreProvider>
                        <ClientProvider>{children}</ClientProvider>
                    </StoreProvider>
                </main>
            </body>
        </html>
    )
}
