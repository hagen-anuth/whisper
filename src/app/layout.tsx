import {Geist, Geist_Mono} from 'next/font/google';

import {Backdrop} from '@/components/backdrop';
import {THEME_INIT_SCRIPT} from '@/components/theme-toggle';

import type {Metadata} from 'next';

import './globals.css';

const geistSans = Geist({variable: '--font-sans', subsets: ['latin']});
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'whisper',
    description: 'Share a secret through a link that works once.',
};

export default function RootLayout({
    children,
}: LayoutProps<'/'>): React.JSX.Element {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{__html: THEME_INIT_SCRIPT}} />
            </head>
            <body className="flex min-h-full flex-col">
                <Backdrop />
                {children}
            </body>
        </html>
    );
}
