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
            <head></head>
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
